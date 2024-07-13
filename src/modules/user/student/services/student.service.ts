import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../combinedUsers/services/user.service';
import { CreateStudentDto } from '../../dtos/student.dto';
import { IStudent } from '../../interfaces/users.interface';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
        private userService: UserService,
    ) {}

    async createStudent(createStudentDto: CreateStudentDto): Promise<any> {
        try {
        console.log(`Create Student Service: ${JSON.stringify(createStudentDto)}`);

        const {
            firstName,
            middleName,
            lastName,
            age,
            address,
            gender,
            stateOfOrigin,
            dateOfBirth,
            ...userDto
        } = createStudentDto;

        console.log(`Student Password: ${JSON.stringify(userDto['password'])}`);

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
            password: userDto['password'],
            email: userDto['email'] || null,
            phoneNumber: userDto['phoneNumber'] || null,
        };

        const savedUser = await this.userService.createUser(newUserObject);

        // Create Student in Student Table
        const studentUser = this.studentRepository.create({
            userId: generateStudentId,
            firstName,
            middleName,
            lastName,
            age,
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
}
