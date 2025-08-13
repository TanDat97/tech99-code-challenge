import { booleanTransform } from '../../utils';

export class BasePaginateDto {
  page?: number = 1;

  limit?: number = 20;

  orderBy?: string;

  orderType?: 'ASC' | 'DESC';

  key?: string;

  get hasKeyword() {
    return this.key && this.key.length > 0;
  }

  get keyword() {
    return `%${this.key}%`;
  }
}
