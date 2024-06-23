import { IAdmin } from "../interfaces/admin.interface";
import { IStudent } from "../interfaces/student.interface";
import { ITeacher } from "../interfaces/teacher.interface";


export type CombinedUsersInterface = IAdmin  | IStudent | ITeacher


