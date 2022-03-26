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
  school: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

export default UserEntity;
