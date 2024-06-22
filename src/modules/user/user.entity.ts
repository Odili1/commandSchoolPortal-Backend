import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Admin } from './admin/entities/admin.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column({nullable: true})
  email: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'student', 'teacher', 'staff'],
  })
  role: string;

  @OneToOne(() => Admin, (admin) => admin.user)
  admin: Admin;
}
