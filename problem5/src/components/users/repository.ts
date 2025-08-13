import { Brackets } from 'typeorm';
import { CoreRepository, ENTITY_REPOSITORY_METADATA } from '@core';
import { GetListUserDto } from './dto';
import { UserEntity } from './entity';

@Reflect.metadata(ENTITY_REPOSITORY_METADATA, UserEntity)
export class UserRepository extends CoreRepository<UserEntity> {
  constructor() {
    super();
  }
  getListQuery(dto: GetListUserDto) {
    const query = this.repository.createQueryBuilder('user');

    if (dto.hasKeyword) {
      query.andWhere(new Brackets(qb => qb.orWhere('users.name LIKE :keyword', { keyword: dto.keyword })));
    }

    return query;
  }

  findDuplicate(id: number, email: string, username: string) {
    const query = this.repository
      .createQueryBuilder('users')
      .select(['users.id', 'users.email', 'users.username'])
      .where(
        `(LOWER(users.email) = LOWER(:email) OR LOWER(users.email) = LOWER(:username) OR 
         LOWER(users.username) = LOWER(:email)  OR LOWER(users.username) = LOWER(:username))`,
        { id, email, username }
      );

    if (id) {
      query.andWhere('users.id != :id ', { id });
    } else {
      query.andWhere('users.id IS NOT NULL');
    }

    return query;
  }
}
