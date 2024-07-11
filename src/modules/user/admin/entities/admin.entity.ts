import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../combinedUsers/entities/user.entity';

@Entity()
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @OneToOne(() => User, (user) => user.admin)
  @JoinColumn({name: 'userDetails'})
  user: User

}
