import { IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { Type } from "class-transformer";

export class CreateAdminDto{
    @IsString()
    readonly firstName: string

    @IsString()
    readonly lastName: string

    readonly user?: CreateUserDto
}


export class UpdateAdminDto{
    @IsString()
    @IsOptional()
    readonly firstName?: string

    @IsString()
    @IsOptional()
    readonly lastName?: string

    @ValidateNested({each: true})
    @Type(() => UpdateUserDto)
    readonly user?: UpdateUserDto
}



