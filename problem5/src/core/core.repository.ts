import { DeepPartial, EntityManager, FindManyOptions, FindOneOptions, FindOptionsWhere, FindTreeOptions, SelectQueryBuilder } from 'typeorm';
import { Context } from '@helpers';
import { myDataSource } from '@database';
import { ENTITY_REPOSITORY_METADATA } from './constants';
import { IEntity } from './core.entity';

export class CoreRepository<TEntity extends IEntity> {
  constructor() {
    this.context = new Context();
    this.manager = new EntityManager(myDataSource);
  }
  protected context: Context;
  protected manager: EntityManager;

  protected get entityTarget() {
    return Reflect.getMetadata(ENTITY_REPOSITORY_METADATA, this.constructor);
  }

  protected get repository() {
    return this.manager.getRepository<TEntity>(this.entityTarget);
  }

  protected get treeRepository() {
    return this.manager.getTreeRepository<TEntity>(this.entityTarget);
  }

  protected get author() {
    return this.context.user;
  }

  async find(options?: FindManyOptions<TEntity>) {
    return this.repository.find(options);
  }

  async count(options?: FindManyOptions<TEntity>) {
    return this.repository.count(options);
  }

  create(partialEntity: DeepPartial<TEntity>) {
    return this.repository.create(partialEntity);
  }

  async findOne(options?: FindOneOptions<TEntity>) {
    return this.repository.findOne(options);
  }

  async findOneOrFail(options?: FindOneOptions<TEntity>) {
    return this.repository.findOneOrFail(options);
  }

  async countDescendants(entity: TEntity) {
    return this.treeRepository.countDescendants(entity);
  }

  async countAncentors(entity: TEntity) {
    return this.treeRepository.countAncestors(entity);
  }

  async findDescendants(entity: TEntity, options?: FindTreeOptions) {
    return this.treeRepository.findDescendants(entity, options);
  }

  async findAncentors(entity: TEntity, options?: FindTreeOptions) {
    return this.treeRepository.findAncestors(entity, options);
  }

  async save(partialEntity: DeepPartial<TEntity>) {
    partialEntity.updatedBy = this.author?.id;
    return this.repository.save(partialEntity);
  }

  async softRemove(partialEntity: DeepPartial<TEntity>) {
    partialEntity.deletedBy = this.author?.id;
    return this.repository.softRemove(partialEntity);
  }

  async softDelete(options: FindOptionsWhere<TEntity>) {
    return this.manager.update(this.entityTarget, options, {
      deletedAt: new Date(),
      deletedBy: this.author?.id,
    });
  }

  getSequenceValueQuery(seqKey: string, increment: number = 1) {
    const query = `
      DECLARE @sequence BIGINT;
      EXEC @sequence = dbo.Proc_GetSequenceVal @sSeqName = ${seqKey}, @iIncrement = ${increment};
      SELECT @sequence;
    `;
    return query;
  }

  async getSequenceValue(seqKey: string, increment: number = 1) {
    const query = this.getSequenceValueQuery(seqKey, increment);
    const values = await this.manager.query(query);
    return (values?.[0]?.seqValue as number) || 0;
  }

  async paginate(queryBuilder: SelectQueryBuilder<TEntity>, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const [items, totalItems] = await queryBuilder.skip(skip).take(limit).getManyAndCount();

    const isFloat = totalItems % limit !== 0;
    const pages = totalItems / limit;
    let totalPages: number = Math.floor(pages);
    if (isFloat) totalPages += 1;

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }
}
