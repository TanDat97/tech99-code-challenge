import { CoreService } from '@core';
import { CreateUserDto, GetListUserDto, UpdateUserDto } from './dto';
import { UserRepository } from './repository';
import { AppError } from '@core/error';

export class UserService extends CoreService {
  protected repository: UserRepository;
  constructor() {
    super(new UserRepository());
  }

  async getList(dto: GetListUserDto) {
    const query = this.repository.getListQuery(dto);
    const result = await this.repository.paginate(query, dto.page, dto.limit);
    return result;
  }

  async getDetail(id: number) {
    const result = await this.repository.findOneOrFail({ where: { id } });
    return result;
  }

  async create(dto: CreateUserDto) {
    const username = dto.username || dto.email;
    const exist = await this.repository.findDuplicate(null, dto.email, username).getOne();
    if (exist) {
      throw new AppError(400, { errorCode: 10002, message: 'Email or username is invalid or has been used!' });
    }
    const entity = this.repository.create({
      name: dto.name,
      email: dto.email,
      username: dto.username,
      status: dto.status,
      isActive: dto.isActive,
      avatar: dto.avatar,
      createdBy: this.context.user?.id,
      updatedBy: this.context.user?.id,
    });
    return this.repository.save(entity);
  }

  async update(id: number, dto: UpdateUserDto) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new AppError(404, { errorCode: 10003, message: 'User not found!' });
    }
    return this.repository.save({ ...entity, ...dto });
  }

  async delete(id: number) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new AppError(404, { errorCode: 10003, message: 'User not found!' });
    }
    return this.repository.softDelete({ id });
  }
}
