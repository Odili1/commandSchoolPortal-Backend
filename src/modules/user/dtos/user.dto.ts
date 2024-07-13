

export class CreateUserDto{
    readonly userId: string
    readonly password: string
    readonly email?: string
    readonly phoneNumber?: string
    readonly updatedAt?: Date
    readonly createdAt?: Date
}


export class updateUserDto {
    readonly userId?: string
    avatar?: string
    readonly changePassword?: string
    readonly email?: string
    readonly phoneNumber?: string
}