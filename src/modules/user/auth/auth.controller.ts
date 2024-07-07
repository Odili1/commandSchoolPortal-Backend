import { BadRequestException, Body, Controller, NotFoundException, Post, Res } from "@nestjs/common";
// import { CreateAdminDto } from "../dtos/admin.dto";
// import { AdminService } from "../admin/admin.service";
// import { IAdmin } from "../interfaces/admin.interface";
import { LoginDto } from "../dtos/login.dto";
import { AuthService } from "./auth.service";
import { idPrefixFunc, validIdPrefix } from "src/common/helpers/idPrefix.helper";
import { Public } from "src/common/decorators/auth.decorator";
import { Response } from "express";


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
    async login(@Body() loginDto: LoginDto, @Res({passthrough: true}) res: Response): Promise<any>{
        try {
            const {userId, password} = loginDto

            // Check Id Input
            const idPrefix = idPrefixFunc(userId)
            if (!validIdPrefix(idPrefix)){
                throw new BadRequestException('Invalid Id Prefix')
            }

            const user = await this.authservice.validateUser(userId, password)

            // Genenrate Token
            const token = await this.authservice.generateAccessToken(user)

            // Set token in cookie
            res.cookie('access_token', token, {
                maxAge: 24 * 60 * 60 * 1000,
            })

            return {
                userId: userId
            }
        } catch (error) {
            if (error instanceof BadRequestException){
                console.log(error);
                throw new BadRequestException(error)
            }
            console.log(error);
            
            if (error instanceof NotFoundException){
                throw new NotFoundException(error)
            }

            throw new Error(error)
        }
    }
}




