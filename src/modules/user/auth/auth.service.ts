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

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private passwordService: PasswordService,
  ) {}

  async validateUser(userId: string, password: string) {
    try {
      const idPrefix = idPrefixFunc(userId);
      console.log('ValidateUser');
      
      // Validate Admin Login
      if (idPrefix === 'Ad') {
        const adminUser = await this.adminService.getAdminByAdminId(userId);
        
        console.log('adminDetails:', adminUser);
        if (!adminUser) {
          throw new NotFoundException('Invalid Credentials');
        }
        
        console.log('validPasswod:', adminUser.user.password);
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
        // ---- CHANGE THIS CODE -----
        // const adminUser = await this.adminService.getAdminByAdminId(id)
        // if (!adminUser){
        //     throw new NotFoundException('Invalid Credentials')
        // }
        // const validPassword = await this.passwordService.validPassword(password, adminUser.password)
        // if (!validPassword){
        //     throw new BadRequestException('Invalid Username or Password')
        // }
      }
    } catch (error) {
      console.log(error);
      
      throw new InternalServerErrorException('ISE$AUTH1Internal Server Error');
    }
  }

  async generateAccessToken(
    user: CombinedUsersInterface | any
  ): Promise<{ access_token: string }> {
    console.log('Generate Token');
    
    // *** user can have a type of IAdmin | IStudent | ITeacher | IStaff
    const payload = {
      id: user.id,
      userId: user['userId'],
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token: access_token,
    };
  }
}
