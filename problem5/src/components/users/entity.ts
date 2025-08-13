import { Entity, Column } from 'typeorm';
import { CoreEntity } from '@core/core.entity';
import { BooleanColumn, EnumColumn } from '@libraries/typeorm';
import { UserStatus } from '@core/interfaces';

@Entity({ name: 'cfs_users' })
export class UserEntity extends CoreEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @EnumColumn()
  status: UserStatus;

  @BooleanColumn()
  isActive: number;

  @Column({ nullable: true })
  avatar: string;
}
