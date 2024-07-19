import { IsString } from "class-validator"


export class CreateUserDto{
    readonly userId: string
    readonly password: string
    readonly email?: string
    readonly phoneNumber?: string
    readonly updatedAt?: Date
    readonly createdAt?: Date
}


export class UpdateUserDto {
    readonly userId?: string
    avatar?: string

    @IsString()
    readonly newPassword?: string

    @IsString()
    readonly confirmPassword?: string

    readonly email?: string
    readonly phoneNumber?: string
}
