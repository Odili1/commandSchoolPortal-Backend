import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";
import { StudentService } from "../services/student.service";
import { CreateStudentDto } from "../../dtos/student.dto";
import { idPrefixFunc, validIdPrefix } from "src/common/helpers/idPrefix.helper";
import { IStudent } from "../../interfaces/users.interface";
import { RoleGuard } from "src/common/guards/role.guard";
import { Role } from "src/common/decorators/role.decorator";


@UseGuards(RoleGuard)

@Controller('student')
export class StudentController{
    constructor(
        private studentService: StudentService
    ){}

    @Role('admin', 'student')
    @Post('new-student')
    async createStudent(@Body() createStudentDto: CreateStudentDto): Promise<IStudent>{
       try {
            const createdStudent = this.studentService.createStudent(createStudentDto)

            return createdStudent
       } catch (error) {
            if (error instanceof BadRequestException){
                throw new BadRequestException(error)
            }
            if (error instanceof NotFoundException){
                throw new NotFoundException(error)
            }
            
            throw new Error(error)
       }
    }

    @Role('admin')
    @Get('all')
    async getStudents(): Promise<IStudent[]>{
        try {
            const students = await this.studentService.getAllStudents()

            return students
        } catch (error) {
            if (error instanceof NotFoundException){
                throw new NotFoundException(error)
            }

            throw new Error(error)
        }
    }

    @Role('admin', 'student')
    @Get(':id')
    async getStudent(@Param('id') studentId:string): Promise<IStudent>{
        try {
            // Check Id Input
            const idPrefix = idPrefixFunc(studentId)
            if (!validIdPrefix(idPrefix)){
                throw new BadRequestException('Invalid Id Prefix')
            }

            const student = await this.studentService.getStudentById(studentId)

            return student
        } catch (error) {
            if (error instanceof BadRequestException){
                throw new BadRequestException(error)
            }

            throw new Error(error)
        }
    }
}