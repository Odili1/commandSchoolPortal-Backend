import { IsOptional } from "class-validator"

export class CreateUserDto{
    readonly userId: string
    readonly password: string
    readonly email?: string
    readonly phoneNumber?: string
    readonly updatedAt?: Date
    readonly createdAt?: Date
}


export class UserUpdateDto {
    readonly userId: string

    @IsOptional()
    readonly changePassword: string
    readonly email?: string
    readonly phoneNumber?: string
}