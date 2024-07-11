import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "../../admin/entities/admin.entity";
import { Student } from "../../student/entities/student.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";



@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: string

    @Column()
    password: string

    @Column({nullable: true})
    email: string

    @Column({nullable: true})
    phoneNumber: string

    
    @Column({nullable: true})
    lastLogin: Date
    
    @OneToOne(() => Admin, (admin) => admin.user)
    admin: Admin
    
    @OneToOne(() => Student, (student) => student.user)
    student: Student
    
    @OneToOne(() => Teacher, (teacher) => teacher.user)
    teacher: Teacher
    
    @Column()
    createdAt: Date
}

