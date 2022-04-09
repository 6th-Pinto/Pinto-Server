import { Int } from 'io-ts';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column('varchar', { length: 30, unique: true })
  userId: string;

  @Column('varchar')
  password: string;

  @Column('varchar')
  name: string;

  @Column('datetime')
  birthDate: Date;

  @Column('text')
  phoneNumber: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  school: string;

  @Column('varchar')
  major: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default UserEntity;
