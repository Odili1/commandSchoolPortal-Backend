import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";
import { UserService } from "../user.service";
import { AdminDto } from "./dtos/admin.dto";


@Injectable()
export class AdminService{
    constructor(
        @InjectRepository(Admin)
        private  adminRepository: Repository<Admin>,
        private userService: UserService
    ){}

    async createAdmin(adminDto: AdminDto): Promise<any>{
        const adminId = `ad13${Math.round(Math.random() * 100)}`
        const createdAdmin = await this.userService.createUser(adminDto, 'admin')
        const adminUser = await this.adminRepository.create({
            user: createdAdmin
        })
        adminUser.adminId = adminId

        return await this.adminRepository.save(adminUser)
    }
}




