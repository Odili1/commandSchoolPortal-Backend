import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";



@Entity()
export class Admin extends BaseEntity {
    @PrimaryColumn({unique: true})
    id: string

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column({default: true})
    isActive: boolean
}










