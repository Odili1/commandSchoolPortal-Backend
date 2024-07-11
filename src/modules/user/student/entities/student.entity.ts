import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../combinedUsers/entities/user.entity";
import { Subject } from "src/modules/subject/entities/subject.entity";
import { Class } from "src/modules/class/entities/class.entity";

enum Gender{
    male='male',
    female='female',
}

@Entity()
export class Student extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    userId: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({nullable: true})
    middleName: string

    @Column({nullable: true})
    age: number

    @Column({type: 'enum', enum: Gender})
    gender: Gender

    @Column({nullable: true})
    dateOfBirth: Date

    @Column({nullable: true})
    address: string

    @Column({nullable: true})
    stateOfOrigin: string

    @OneToOne(() => User, (user) => user.student)
    @JoinColumn()
    user: User

    @ManyToMany(() => Subject, (subject) => subject.students)
    @JoinTable()
    subjects: Subject[]

    @ManyToOne(() => Class, (classEntity) => classEntity.students)
    @JoinColumn()
    class: Class


    // constructor(){
    //     super()
    //     this.subjects = []
    // }
}


