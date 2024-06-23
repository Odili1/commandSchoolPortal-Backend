import { IsEnum, IsOptional, IsString } from "class-validator";



export class CreateAdminDto{
    @IsString()
    readonly username: string

    @IsString()
    readonly password: string

    @IsEnum(['admin', 'teacher', 'student', 'staff'])
    @IsString()
    @IsOptional()
    readonly role?: string
}


// export class LoginAdminDto{
//     @IsString()
//     readonly adminId: string

//     @IsString()
//     readonly password: string
// }



