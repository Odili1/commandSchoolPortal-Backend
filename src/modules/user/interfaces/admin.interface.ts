export interface IUser{
    userId: string,
    password: string,
    phoneNumber: string,
    email: string
}


export interface IAdmin{
    userId?: string,
    firstName: string,
    lastName: string,
    user: IUser
}


export interface IStudent{
    studentId?: string,
    username?: string,
    password?: string,
    email?: string,
    role?: string
}


export interface ITeacher{
    teacherId?: string,
    username?: string,
    password?: string,
    email?: string,
    role?: string
}