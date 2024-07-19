import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto, UpdateUserDto } from "../../dtos/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { instanceToPlain } from "class-transformer";
import { IUser } from "../../interfaces/users.interface";
import { PasswordService } from "../../auth/password.service";
import { CloudinaryService } from "src/integration/cloudinary/cloudinary.service";




@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private passwordService: PasswordService,
        private cloudinaryService: CloudinaryService
    ){}


    async createUser(createUserDto: CreateUserDto){
        try {
            // Create user in the user's table
            const newUserDto = {...createUserDto}

            // Hash password
            newUserDto.password = await this.passwordService.hashPassword(createUserDto.password)

            // Set Date
            newUserDto.createdAt = new Date()
            newUserDto.updatedAt = new Date()

            console.log(`createNewUser: ${JSON.stringify(newUserDto)}`);
            
            const newUser = this.userRepository.create(newUserDto)

            const savedUser = await this.userRepository.save(newUser)
            
            return savedUser
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('ISE$USER1: Internal Server Error')
        }
    }

    async getAllUser(): Promise<any>{
        try {
            const users = await this.userRepository.find({relations: ['admin', 'teacher', 'student']})

            if (users.length === 0){
                throw new NotFoundException('No Users Found')
            }

            return instanceToPlain(users)
        } catch (error) {
            console.log(error);
            if (error instanceof NotFoundException){
                throw new NotFoundException(error)
            }
        

            throw new InternalServerErrorException('ISE$USER2: Internal Server Error')
        }
    }

    async getUserById(userId: string): Promise<IUser> {
        try {
          const user = this.userRepository.findOne({
            where: { userId: userId },
          });
    
          if (user === null) {
            console.log('this is an error');
            
            throw new NotFoundException('Invalid Credentials');
          }
          console.log(`getAdminById: ${JSON.stringify(user)}`)
          return user;
        } catch (error) {
          if (error instanceof NotFoundException) {
            throw new NotFoundException(error);
          }
    
          if (error instanceof BadRequestException) {
            throw new BadRequestException(error);
          }
    
          throw new InternalServerErrorException(`ISE$Ad2: Internal Server Error ${error}`);
        }
    }

    async updateLastLogin(userId: string): Promise<void> {
        await this.userRepository.createQueryBuilder().update(User).set({lastLogin: new Date()}).where('userId = :userId', {userId: userId}).execute()
    }

    async updateUser(updateData: UpdateUserDto, file?: Express.Multer.File): Promise<IUser>{
        try {
            console.log(`User Service => file received: ${JSON.stringify(file)}`);
            // Copy the object
            const updateUser = {...updateData}

            if (updateUser['changePassword']) {
                console.log(`Change Password: ${updateData['changePassword']}`);
                
                updateUser['password'] = await this.passwordService.hashPassword(updateData['changePassword'])

                console.log(`Changed Password Hash: ${updateUser['password']}`);
                
                delete updateUser['changePassword']
            }
            // Also Delete the property if none was inputed
            delete updateUser['changePassword']

            // Check if picture is uploaded
            if (file){
                console.log(`File Received: ${file.originalname}`);
                const avatar = await this.cloudinaryService.uploadFile(file).then((data) => {
                    console.log(`avatarData: ${JSON.stringify(data)}`);

                    return data.secure_url
                }).catch((error) => {
                    throw new BadRequestException(error)
                })

                updateUser['avatar'] = avatar
            }

            // modify the updatedDate
            updateUser['updatedAt'] = new Date()

            // Find User
            const user = await this.userRepository.findOne({where: {userId: updateUser.userId}})

            // if user does not exist
            if (!user){
                throw new NotFoundException(`User with Id ${updateData.userId} does not exist`)
            }

            // save user update data
            const update = {...user, ...updateUser}
            const savedUser = await this.userRepository.save(update)

            console.log(`update user data: ${JSON.stringify(update)}`);
            
            console.log(`Updated User Table: ${JSON.stringify(savedUser)}`);
            
            
            return savedUser
        } catch (error) {
            if (error instanceof BadRequestException){
                throw new BadRequestException(error)
            }

            if (error instanceof NotFoundException){
                throw new NotFoundException(error)
            }

            throw new InternalServerErrorException(error)
        }
    }
}


