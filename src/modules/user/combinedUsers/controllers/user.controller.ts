import { BadRequestException, Body, Controller, Delete, Get, Param, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";
import { Role } from "src/common/decorators/role.decorator";
import { RoleGuard } from "src/common/guards/role.guard";
import { UpdateUserDto } from "../../dtos/user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { IUser } from "../../interfaces/users.interface";






@UseGuards(RoleGuard)
@Role('admin')
@Controller('user')
export class UserController{
    constructor(
        private userService: UserService
    ){}

    @Get('all')
    async getAllUsers(): Promise<User[]>{
        return await this.userService.getAllUser()
    }

    @Get(':userId')
    async getUser(@Param('userId') userId: string): Promise<IUser>{
        return await this.userService.getUserById(userId)
    }

    @Put('/update')
    @UseInterceptors(FileInterceptor('avatar'))
    async updateUser(@Body() updateUserDto: UpdateUserDto, file?: Express.Multer.File): Promise<any>{
        try {
            console.log(`updateObject: ${JSON.stringify(updateUserDto)}`)
            const {userId, newPassword, confirmPassword} = updateUserDto

            if (newPassword !== confirmPassword){
                throw new BadRequestException('Passwords do not match')
            }

            const userObject = {
                userId,
                changePassword: confirmPassword
            }
            
            return await this.userService.updateUser(userObject, file)
        } catch (error) {
            if (error instanceof BadRequestException){
                throw new BadRequestException(error)
            }
        
            throw new Error(error)
        }
    }

    @Delete('/delete/:userId')
    async deleteUser(@Param('userId') userId: string): Promise<void>{
        try {
            console.log('DeleteUser Controller');
            
            return await this.userService.deleteUser(userId)
        } catch (error) {
            throw new Error(error)
        }
    }
}




