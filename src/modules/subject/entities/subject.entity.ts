import { Class } from "src/modules/class/entities/class.entity";
import { Student } from "src/modules/user/student/entities/student.entity";
import { Teacher } from "src/modules/user/teacher/entities/teacher.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class Subject extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Student, (student) => student.subjects, {nullable: true})
    students: Student[]

    @ManyToMany(() => Class, (classEntity) => classEntity.subjects, {nullable: true})
    classDetails: Class[]

    @ManyToMany(() => Teacher, (teacher) => teacher.subjects, {nullable: true})
    teachers: Teacher[]

    @Column()
    createdAt: Date

    // constructor(){
    //     super()
    //     this.students = []
    //     this.teachers = []
    //     this.classes = []
    // }
}

