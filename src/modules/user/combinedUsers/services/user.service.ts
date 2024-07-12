import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../../dtos/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { instanceToPlain } from "class-transformer";
// import { IUser } from "../../interfaces/users.interface";
import { PasswordService } from "../../auth/password.service";




@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private passwordService: PasswordService
    ){}


    async createUser(createUserDto: CreateUserDto){
        try {
            // Create user in the user's table
            const newUserDto = {...createUserDto}
            newUserDto.createdAt = new Date()
            newUserDto.updatedAt = new Date()
            console.log(`createNewUser: ${JSON.stringify(newUserDto)}`);
            
            const newUser = this.userRepository.create(createUserDto)

            const savedUser = await this.userRepository.save(newUser)
            
            return savedUser
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('ISE$USER1: Internal Server Error')
        }
    }

    async getAllUser(): Promise<any>{
        try {
            const users = await this.userRepository.find({relations: ['admin']})

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

    async updateLastLogin(userId: number): Promise<void> {
        await this.userRepository.update(userId, { lastLogin: new Date() });
    }

    // async updateUser(userId: string, updateData: UserUpdateDto, file: Express.Multer.File): Promise<IUser>{
    //     try {
    //         if (updateData['changePassword']) {
    //             console.log(`Change Password: ${updateData['changePassword']}`);
                
    //             updateData['password'] = this.passwordService.hashPassword(updateData['changePassword'])
    //         }

    //         if (file){

    //         }
    //     } catch (error) {
    //         throw new InternalServerErrorException(error)
    //     }
    // }
}


