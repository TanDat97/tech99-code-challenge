import { BasePaginateDto } from '@core/dto';
import { UserStatus } from '@core/interfaces';

export class GetListUserDto extends BasePaginateDto {
  email: string;
}

export class UserDto {
  email: string;

  username: string;

  name: string;

  status: UserStatus = UserStatus.enabled;

  isActive: number = 1;

  avatar: string;
}

export class CreateUserDto extends UserDto {}

export class UpdateUserDto extends UserDto {}
