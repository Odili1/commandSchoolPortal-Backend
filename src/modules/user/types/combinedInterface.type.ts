import { IAdmin } from '../interfaces/users.interface';
import { IStudent } from '../interfaces/users.interface'; 
import { ITeacher } from '../interfaces/users.interface'; 

export type CombinedUsersInterface = IAdmin | IStudent | ITeacher;
