import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../../dtos/admin.dto";
import { InjectRepository } from "@nestjs/typeorm";




@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}


    async createUser(createUserDto: CreateUserDto){
        try {
            // Create user in the user's table
            createUserDto.createdAt = new Date()
            const newUser = this.userRepository.create(createUserDto)

            return await this.userRepository.save(newUser)
            
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('ISE$USER1: Internal Server Error')
        }
    }

    async getAllUser(): Promise<User[]>{
        try {
            const users = await this.userRepository.find({relations: ['admin']})

            if (users.length === 0){
                throw new NotFoundException('No Users Found')
            }

            return users
        } catch (error) {
            console.log(error);
            if (error instanceof NotFoundException){
                throw new NotFoundException(error)
            }
        

            throw new InternalServerErrorException('ISE$USER2: Internal Server Error')
        }
    }
}


