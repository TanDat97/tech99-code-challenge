import { Context } from '@helpers';
import { IEntity } from './core.entity';
import { CoreRepository } from './core.repository';

export class CoreService {
  constructor(repository: CoreRepository<IEntity>) {
    this.repository = repository;
    this.context = new Context();
  }
  protected repository: CoreRepository<IEntity>;
  protected context?: Context;
}
