import { Injectable, InternalServerErrorException } from "@nestjs/common";
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
            const users = this.userRepository.find({relations: ['admin']})

            return users
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('ISE$USER1: Internal Server Error')
        }
    }
}


