import { string } from 'joi';
import { EntityRepository, Repository, createQueryBuilder, getRepository, SelectQueryBuilder } from 'typeorm';

import UserEntity from '../entity/user';
import { UserInfo } from '../types';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {
  async findByUid(uid: string): Promise<UserEntity | undefined> {
    const user = await this.findOne({ where: { uid } });
    return user;
  }

  async findByUserId(userId: string): Promise<UserEntity | undefined> {
    const user = await this.findOne({ where: { userId } });
    return user;
  }

  async createUser(userInfo: UserInfo): Promise<UserEntity> {
    const newUser = this.create(userInfo);
    const createdUser = await this.save(newUser);
    return createdUser;
  }

  async findNameByUserID(userId: string): Promise<UserEntity | undefined>{
    const userName: any = await createQueryBuilder()
      .select('user.userId')
      .from(UserEntity,"user")
      .where('user.user_id = :user_id', {user_id: userId})
      .getOne();
    return userName;
  }
  
  async findSchoolByUserID(userId: string): Promise<UserEntity>{
    const userMajor: any = await createQueryBuilder()
      .select('school')
      .where('user_id = : user_id', { user_id :userId })
      .getOne();
    return userMajor;
  }
  
  async findMajorByUserID(userId: string): Promise<UserEntity>{
    const userMajor: any = await createQueryBuilder('user')
      .select('major')
      .where('user_id = : user_id', { user_id :userId })
      .getOne()
    return userMajor;
  }
  
}
export default UserRepository;
