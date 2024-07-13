import { IsOptional, IsString } from "class-validator";
import { CreateUserDto } from "./user.dto";

export class CreateAdminDto{
    @IsString()
    readonly firstName: string

    @IsString()
    readonly lastName: string

    readonly user?: CreateUserDto
}


export class updateAdminDto{
    @IsString()
    @IsOptional()
    readonly firstName?: string

    @IsString()
    @IsOptional()
    readonly lastName?: string

    @IsString()
    @IsOptional()
    readonly changePassword?: string

    readonly user?: CreateUserDto
}



