import { Class } from "src/modules/class/entities/class.entity";
import { Subject } from "src/modules/subject/entities/subject.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../combinedUsers/entities/user.entity";



@Entity()
export class Teacher extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    userId: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @OneToOne(() => User, (user) => user.student)
    @JoinColumn()
    user: User

    @ManyToMany(() => Subject, (subject) => subject.teachers)
    @JoinTable()
    subjects: Subject[]

    @ManyToMany(() => Class, (classEntity) => classEntity.teachers)
    @JoinTable()
    classes: Class[]

    // constructor(){
    //     super()
    //     this.subjects = []
    //     this.classes = []
    // }
}

