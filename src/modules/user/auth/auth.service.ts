import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/services/admin.service';
import { PasswordService } from './password.service';
// import { IAdmin } from "../interfaces/admin.interface";
// import { ITeacher } from "../interfaces/teacher.interface";
// import { IStudent } from "../interfaces/student.interface";
import { CombinedUsersInterface } from '../types/combinedInterface.type';
import { idPrefixFunc } from 'src/common/helpers/idPrefix.helper';
import { StudentService } from '../student/services/student.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private passwordService: PasswordService,
    private studentService: StudentService
  ) {}

  async validateUser(userId: string, password: string) {
    try {
      const idPrefix = idPrefixFunc(userId);
      console.log('ValidateUser');
      
      // Validate Admin Login
      if (idPrefix === 'Ad') {
        const adminUser = await this.adminService.getAdminById(userId);
        
        console.log('adminDetails:', adminUser);

        if (!adminUser){
          throw new NotFoundException('Invalid Credentials')
        }
        
        console.log('validPassword:', adminUser.user.password);
        const validPassword = await this.passwordService.validPassword(
          password,
          adminUser.user.password,
        );
        
        if (!validPassword) {
          throw new BadRequestException('Invalid Username or Password');
        }

        return adminUser;
      }

      // Validate Teacher Login
      if (idPrefix === 'Th') {
        // ********** CHANGE THID CODE **********
        // const adminUser = await this.adminService.getAdminByAdminId(id)
        // if (!adminUser){
        //     throw new NotFoundException('Invalid Credentials')
        // }
        // const validPassword = await this.passwordService.validPassword(password, adminUser.password)
        // if (!validPassword){
        //     throw new BadRequestException('Invalid Username or Password')
        // }
      }

      // Validate Student Login
      if (idPrefix === 'St') {
        const studentUser = await this.studentService.getStudentById(userId)
        
        console.log('studentDetails:', studentUser);

        if (!studentUser){
          throw new NotFoundException('Invalid Credentials')
        }
        
        console.log('validPassword:', studentUser.user.password);
        const validPassword = await this.passwordService.validPassword(
          password,
          studentUser.user.password,
        );
        
        if (!validPassword) {
          throw new BadRequestException('Invalid Username or Password');
        }

        return studentUser;
      }
    } catch (error) {
      console.log(error.response);
      // console.log(error.response.message);
      // console.log(error.response.error);
      // console.log(error.response.statusCode);
      console.log(error);
      if (error instanceof NotFoundException){
        throw new NotFoundException(error)
      }

      if (error instanceof BadRequestException){
        throw new BadRequestException(error)
      }
      
      throw new InternalServerErrorException('ISE$auth1: Internal Server Error')
    }
  }

  async generateAccessToken(
    user: CombinedUsersInterface | any
  ): Promise<string> {
    console.log('Generate Token');
    
    // *** user can have a type of IAdmin | IStudent | ITeacher | IStaff
    const payload = {
      id: user.id,
      userId: user['userId'],
    };

    const access_token = await this.jwtService.signAsync(payload);

    console.log(`Token: ${JSON.stringify(access_token)}`);
    

    // return {
    //   userId: user['userId'],
    //   access_token: access_token
    // };
    return access_token
  }
}
