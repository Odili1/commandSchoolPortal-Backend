import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
// import { CreateAdminDto } from "../dtos/admin.dto";
// import { AdminService } from "../admin/admin.service";
// import { IAdmin } from "../interfaces/admin.interface";
import { LoginDto } from "../dtos/login.dto";
import { AuthService } from "./auth.service";
import { idPrefixFunc, validIdPrefix } from "src/common/helpers/idPrefix.helper";
import { Public } from "src/common/decorators/auth.decorator";


@Controller('auth')
export class AuthController{
    constructor(
        private authservice: AuthService
    ){}

    // ---------- SIGNUP ROUTE ------------

    // @Post('/admin/create')
    // async createAdmin (@Body() createAdminDto: CreateAdminDto): Promise<IAdmin>{
    //     try {
    //         console.log(createAdminDto);
    //         const createdAdmin = this.adminService.createAdmin(createAdminDto, 'admin')

    //         return createdAdmin
    //     } catch (error) {
    //         if (error instanceof BadRequestException){
    //             throw new BadRequestException('Invalid input data')
    //         }

    //         throw new Error(error)
    //     }
    // }

    // @Post('/teacher/signup')
    // async createTeacher (@Body() createAdminDto: CreateAdminDto): Promise<IAdmin>{
    //     try {
    //         console.log(createAdminDto);
    //         const createdAdmin = this.adminService.createAdmin(createAdminDto, 'admin')

    //         return createdAdmin
    //     } catch (error) {
    //         if (error instanceof BadRequestException){
    //             throw new BadRequestException('Invalid input data')
    //         }

    //         throw new Error(error)
    //     }
    // }

    // @Post('/student/signup')
    // async createStudent (@Body() createAdminDto: CreateAdminDto): Promise<IAdmin>{
    //     try {
    //         console.log(createAdminDto);
    //         const createdAdmin = this.adminService.createAdmin(createAdminDto, 'admin')

    //         return createdAdmin
    //     } catch (error) {
    //         if (error instanceof BadRequestException){
    //             throw new BadRequestException('Invalid input data')
    //         }

    //         throw new Error(error)
    //     }
    // }




    // ---------- LOGIN ROUTES ----------
    @Public(true)
    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<any>{
        try {
            const {userId, password} = loginDto

            // Check Id Input
            const idPrefix = idPrefixFunc(userId)
            if (!validIdPrefix(idPrefix)){
                throw new BadRequestException('Inalid id Prefix')
            }

            const user = await this.authservice.validateUser(userId, password)

            if (!user){
                throw new BadRequestException('Invalid input data')
            }

            // login user
            return await this.authservice.generateAccessToken(user)
        } catch (error) {
            if (error instanceof BadRequestException){
                throw new BadRequestException('Invalid input data')
            }
            console.log(error);
            
            throw new Error(error) 
        }
    }
}




