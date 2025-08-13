export interface BaseInterface {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
}
