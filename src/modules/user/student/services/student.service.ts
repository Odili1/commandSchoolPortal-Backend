import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../combinedUsers/services/user.service';
import { CreateStudentDto, UpdateStudentDto } from '../../dtos/student.dto';
import { IStudent } from '../../interfaces/users.interface';
import { instanceToPlain } from 'class-transformer';
import { calculateAge } from 'src/common/helpers/dates.helper';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
        private userService: UserService,
    ) {}

    // NEW STUDENT
    async createStudent(createStudentDto: CreateStudentDto): Promise<any> {
        try {
        console.log(`Create Student Service: ${JSON.stringify(createStudentDto)}`);

        const {
            firstName,
            middleName,
            lastName,
            address,
            gender,
            stateOfOrigin,
            dateOfBirth,
            user
        } = createStudentDto;

        console.log(`Student Password: ${JSON.stringify(user['password'])}`);

        // Generate Student ID
        const generateNumber = () => Math.round(Math.random() * 1000);
        let number = generateNumber();
        let generateStudentId = `St13${number >= 100 ? number : number >= 100 ? `0${number}` : `00${number}`}`;

        // check if id is already used
        const students = await this.studentRepository.find({});
        const IDs = students.map((student) => student.userId);

        while (IDs.includes(generateStudentId)) {
            console.log('generatedId:', generateStudentId);
            number = generateNumber();
            generateStudentId = `St13${number >= 100 ? number : number >= 100 ? `0${number}` : `00${number}`}`;
        }

        // Create Student in User Table
        const newUserObject = {
            userId: generateStudentId,
            password: user['password'],
            email: user['email'] || null,
            phoneNumber: user['phoneNumber'] || null,
        };

        const savedUser = await this.userService.createUser(newUserObject);

        // Create Student in Student Table
        const studentUser = this.studentRepository.create({
            userId: generateStudentId,
            firstName,
            middleName,
            lastName,
            age: calculateAge(dateOfBirth),
            gender,
            address,
            stateOfOrigin,
            dateOfBirth,
            user: savedUser,
        });

        // Saving the details to DB
        const savedStudent = await this.studentRepository.save(studentUser);

        return savedStudent;
        } catch (error) {
        throw new InternalServerErrorException('ISE$St1: Internal Server Error');
        }  
    }

    // FETCHING STUDENT BY ID FROM THE DB
    async getStudentById(studentId: string): Promise<IStudent> {
        try {
            const studentUser = this.studentRepository.findOne({
                where: { userId: studentId },
                relations: ['user'],
            });
            
            console.log(`Student User By Id: ${JSON.stringify(studentUser)}`);
            
            if (!studentUser) {
                throw new NotFoundException('Invalid Credentials');
            }
            
            return studentUser;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error);
            }
        
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error);
            }
        
            throw new InternalServerErrorException('ISE$St2: Internal Server Error');
        }
    }

    // FETCHING ALL STUDENTS FROM DB
    async getAllStudents():Promise<any>{
        try{
            const students = await this.studentRepository.find({relations: ['user']})

            if (students.length === 0) {
                throw new NotFoundException('No Students found');
            }
        
            return instanceToPlain(students);
        }catch(error){
            console.log(error);
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error);
            }

            throw new InternalServerErrorException('ISE$St3: Internal Server Error');
        }
    }

    // UPDATE STUDENT ENTERIES
    async updateStudent(userId: string, studentProfileDto: UpdateStudentDto, file?: Express.Multer.File): Promise<any>{
        try {
            console.log(`Student Service => file received: ${JSON.stringify(file)}`);
            console.log(`Student Service => DTO received: ${JSON.stringify(studentProfileDto)}`);
            const {firstName, lastName, middleName, dateOfBirth, stateOfOrigin, address, user} = studentProfileDto
        
            const updateUserObject = {
                userId,
                email: user['email'] || null,
                phoneNumber: user['phoneNumber'] || null
            }
        
            // Update the user in the user table
            const updatedUser = await this.userService.updateUser(updateUserObject, file)
        
            // Update user in the Admin table
            const studentUser = await this.studentRepository.findOne({where: {userId: userId}})
            
            if (!studentUser) {
                throw new NotFoundException(`User with ID ${userId} not found`);
            }
        
            // Save update
            const update = {
                ...studentUser, 
                firstName, 
                lastName, 
                middleName: middleName || null, 
                dateOfBirth: dateOfBirth || null,
                stateOfOrigin: stateOfOrigin || null,
                address: address || null,
                user: updatedUser
            }

            const saveStudentUser = await this.studentRepository.save(update)
            console.log(`Updated User: ${saveStudentUser}`);
            
        
            return instanceToPlain(saveStudentUser)
        } catch (error) {
            if (error instanceof NotFoundException){
                throw new NotFoundException(error)
            }
            console.log(`Error: ${error}`);
            
            throw new InternalServerErrorException(`ISE$St4: Internal Server Error: ${error}`)
        }   
    }
}
