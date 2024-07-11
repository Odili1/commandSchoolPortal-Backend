import { Subject } from "src/modules/subject/entities/subject.entity";
import { Student } from "src/modules/user/student/entities/student.entity";
import { Teacher } from "src/modules/user/teacher/entities/teacher.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Class extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(()=> Student, (student) => student.class)
    students: Student[]

    @ManyToMany(()=> Subject, (subject) => subject.classes)
    @JoinTable()
    subjects: Subject[]

    @ManyToMany(() => Teacher, (teacher) => teacher.classes)
    teachers: Teacher[]

    @Column()
    createdAt: Date

    // constructor(){
    //     super()
    //     this.teachers = []
    //     this.subjects = []
    //     this.students = []
    // }
}

