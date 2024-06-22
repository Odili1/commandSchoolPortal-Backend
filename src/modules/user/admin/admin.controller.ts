import { Body, Controller, Post } from "@nestjs/common";
import { AdminDto } from "./dtos/admin.dto";
import { AdminService } from "./admin.service";





@Controller()
export class AdminController{
    constructor(
        private adminService: AdminService
    ){}

    @Post('/signup')
    async createAdmin (@Body() createAdminDto: AdminDto){
        console.log(createAdminDto);
        
        return this.adminService.createAdmin(createAdminDto)
    }
}




