import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Category, Gender } from '../student/entities/student.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { IClass, ISubject } from '../interfaces/users.interface';
import { Type } from 'class-transformer';

export class CreateStudentDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly middleName?: string;

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
  @Type(() => CreateStudentDto)
  readonly user?: CreateUserDto;

  @IsOptional()
  readonly classDetails?: IClass;

  @IsOptional()
  readonly subjects?: ISubject[];
}



export class UpdateStudentDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  @IsOptional()
  readonly middleName?: string;

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

  @IsString()
  @IsOptional()
  @IsEnum(Category)
  readonly category?: Category

  @IsOptional()
  @Type(() => UpdateUserDto)
  readonly user?: UpdateUserDto;

  @IsOptional()
  readonly classDetails?: IClass;

  @IsOptional()
  readonly subjects?: ISubject[];
}
