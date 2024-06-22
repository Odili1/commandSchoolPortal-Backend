import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./user.dto";
import { PasswordService } from "./auth/password.service";




@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private passwordService: PasswordService
    ){}

    async createUser(createUserDto: CreateUserDto, role: string): Promise<User>{
        const passwordHash = await this.passwordService.hashPassword(createUserDto.password)

        const user = await this.userRepository.create({
            username: createUserDto.username,
            password: passwordHash,
            role: role
        })

        return await this.userRepository.save(user)
    }
}



