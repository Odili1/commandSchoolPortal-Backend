import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "../entities/student.entity";
import { Repository } from "typeorm";
import { PasswordService } from "../../auth/password.service";
import { UserService } from "../../combinedUsers/services/user.service";



@Injectable()
export class StudentService{
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
        private passwordService: PasswordService,
        private userService: UserService
    ){}

    async createStudent(){
        
    }
}

