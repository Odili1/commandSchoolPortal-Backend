import { Controller, Get, UseGuards } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";
import { Role } from "src/common/decorators/role.decorator";
import { RoleGuard } from "src/common/guards/role.guard";




@Controller('user')
export class UserController{
    constructor(
        private userService: UserService
    ){}

    @UseGuards(RoleGuard)
    @Role('admin')
    @Get('all')
    async getAllUsers(): Promise<User[]>{
        return await this.userService.getAllUser()
    }
}




