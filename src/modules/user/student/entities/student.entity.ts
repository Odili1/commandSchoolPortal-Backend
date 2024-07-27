import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../combinedUsers/entities/user.entity";
import { Subject } from "src/modules/subject/entities/subject.entity";
import { Class } from "src/modules/class/entities/class.entity";

export enum Gender{
    male='male',
    female='female',
}

export enum Category{
    officer = 'officer',
    soldier = 'soldier',
    staff = 'staff',
    civilian = 'civilian'
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

    @Column({nullable: true, type: 'enum', enum: Category})
    category: Category

    @OneToOne(() => User, (user) => user.student)
    @JoinColumn({name: 'userDetails'})
    user: User

    @ManyToMany(() => Subject, (subject) => subject.students, {nullable: true})
    @JoinTable()
    subjects: Subject[]

    @ManyToOne(() => Class, (classEntity) => classEntity.students, {nullable: true})
    @JoinColumn({name: 'classDetails'})
    classDetails: Class
}


