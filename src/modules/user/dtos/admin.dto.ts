import { IsString } from "class-validator";

export class CreateUserDto{
    userId: string
    password: string
    email?: string
    phoneNumber?: string
    createdAt?: Date
}

export class CreateAdminDto{
    @IsString()
    readonly firstName: string

    @IsString()
    readonly lastName: string

    readonly user?: CreateUserDto

    // @IsString()
    // readonly password: string

    // @IsEnum(['admin', 'teacher', 'student', 'staff'])
    // @IsString()
    // @IsOptional()
    // readonly role?: string
}


export class LoginAdminDto{
    @IsString()
    readonly userId: string

    @IsString()
    readonly password: string
}



