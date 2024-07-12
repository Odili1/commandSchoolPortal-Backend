import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Admin } from "../../admin/entities/admin.entity";
import { Student } from "../../student/entities/student.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Exclude } from "class-transformer";



@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: string

    @Column({nullable: true})
    avatar: string

    @Column()
    @Exclude()
    password: string

    @Column({nullable: true})
    email: string

    @Column({nullable: true})
    phoneNumber: string
    
    @OneToOne(() => Admin, (admin) => admin.user)
    admin: Admin
    
    @OneToOne(() => Student, (student) => student.user)
    student: Student
    
    @OneToOne(() => Teacher, (teacher) => teacher.user)
    teacher: Teacher
    
    @UpdateDateColumn({nullable: true})
    lastLogin: Date

    @CreateDateColumn()
    updatedAt: Date
    
    @CreateDateColumn()
    createdAt: Date
}

