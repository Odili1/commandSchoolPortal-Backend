import { Controller, Post } from "@nestjs/common";
import { StudentService } from "../services/student.service";



@Controller('student')
export class StudentController{
    constructor(
        private studentService: StudentService
    ){}

    @Post('new-student')
    async createStudent(){
       
    }

}