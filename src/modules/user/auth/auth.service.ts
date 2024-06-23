import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../admin/admin.service";
import { PasswordService } from "./password.service";
// import { IAdmin } from "../interfaces/admin.interface";
// import { ITeacher } from "../interfaces/teacher.interface";
// import { IStudent } from "../interfaces/student.interface";
import { CombinedUsersInterface } from "../types/combinedInterface.type";
import { idPrefixFunc } from "src/common/helpers/idPrefix.helper";






@Injectable()
export class AuthService{
    constructor(
        private jwtService: JwtService,
        private adminService: AdminService,
        private passwordService: PasswordService
    ){}

    async validateUser(userId: string, password: string){
        try {
            const idPrefix = idPrefixFunc(userId)

            // Validate Admin Login
            if (idPrefix === 'Ad'){
                const adminUser = await this.adminService.getAdminByAdminId(userId)

                if (!adminUser){
                    throw new NotFoundException('Invalid Credentials')
                }

                const validPassword = await this.passwordService.validPassword(password, adminUser.password)

                if (!validPassword){
                    throw new BadRequestException('Invalid Username or Password')
                }

                return adminUser
            }

            // Validate Teacher Login
            if (idPrefix === 'Th'){
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
            if (idPrefix === 'St'){
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
            throw new InternalServerErrorException('Internal Server Error')
        }
    }


    async generateAccessToken(user: CombinedUsersInterface | any, prefix: string): Promise<{ access_token: string }> {
        // *** user can have a type of IAdmin | IStudent | ITeacher | IStaff
        const payload = {
          id: user.id,
          userId: user[prefix == 'Ad' ? 'adminId' : prefix == 'Th' ? 'teacherId' : prefix == 'St' ? 'studentId' : 'staffId']
        };
    
        const access_token = await this.jwtService.signAsync(payload);
    
        return {
          access_token: access_token
        };
    }
}




