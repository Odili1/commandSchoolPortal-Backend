export interface IUser{
    userId: string,
    avatar?: string,
    password: string,
    phoneNumber?: string,
    email?: string
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
    user: IUser,
    classDetails?: IClass
    subjects?: ISubject[]
}


export interface ITeacher{
    teacherId?: string,
    username?: string,
    password?: string,
    email?: string,
    user: IUser
    subjects?: ISubject[]
    classDetails?: IClass[]
}


export interface IClass{
    name: string,
    formTeacher: string,
    subjects?: ISubject[]
}


export interface ISubject{
    name: string,
    student?: IStudent[]
    teacher?: ITeacher[]
    classDetails?: IClass[]
}
