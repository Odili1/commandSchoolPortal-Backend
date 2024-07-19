import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Gender } from '../student/entities/student.entity';
import { CreateUserDto } from './user.dto';
import { IClass, ISubject } from '../interfaces/users.interface';

export class CreateStudentDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly middleName?: string;

  @IsNumber()
  readonly age: number;

  @IsEnum(Gender)
  readonly gender: Gender;

  @IsDate()
  @IsOptional()
  readonly dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  readonly stateOfOrigin?: string;

  @IsString()
  @IsOptional()
  readonly address?: string;

  @IsOptional()
  readonly user?: CreateUserDto;

  @IsOptional()
  readonly classDetails?: IClass;

  @IsOptional()
  readonly subjects?: ISubject[];
}
