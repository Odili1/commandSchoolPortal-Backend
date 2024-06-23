import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { User } from '../../user.entity';

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  adminId: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column({nullable: true})
  email: string;

  // @Column({
  //   type: 'enum',
  //   enum: ['admin', 'student', 'teacher', 'staff'],
  // })
  // role: string;

}
