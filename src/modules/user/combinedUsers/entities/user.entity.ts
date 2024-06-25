import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "../../admin/entities/admin.entity";



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

    @Column()
    createdAt: Date

    @Column({nullable: true})
    lastLogin: Date

    @OneToOne(() => Admin, (admin) => admin.user)
    admin: Admin
}

