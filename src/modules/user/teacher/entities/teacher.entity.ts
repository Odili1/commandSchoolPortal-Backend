import { Class } from "src/modules/class/entities/class.entity";
import { Subject } from "src/modules/subject/entities/subject.entity";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../combinedUsers/entities/user.entity";

export enum Gender{
    male='male',
    female='female',
}

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

    @Column({type: 'enum', enum: Gender})
    gender: Gender

    @Column({nullable: true})
    formClass: string

    @OneToOne(() => User, (user) => user.student, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'userDetails'})
    user: User

    @ManyToMany(() => Subject, (subject) => subject.teachers, {nullable: true})
    @JoinTable()
    subjects: Subject[]

    @ManyToMany(() => Class, (classEntity) => classEntity.teachers, {nullable: true})
    @JoinTable()
    classDetails: Class[]
}

