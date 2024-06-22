import { IsEnum, IsOptional, IsString } from "class-validator";





export class CreateUserDto{
    @IsString()
    readonly username: string

    @IsString()
    readonly password: string

    @IsEnum(['admin', 'teacher', 'student', 'staff'])
    @IsString()
    @IsOptional()
    readonly role?: string
}



