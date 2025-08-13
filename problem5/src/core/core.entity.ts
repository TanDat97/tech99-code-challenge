import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';

export interface IEntity {
  clientId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
}

export class CoreEntity implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 100 })
  clientId?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ readonly: true, nullable: true })
  createdBy?: number;

  @Column({ nullable: true })
  updatedBy?: number;

  @Column({ nullable: true })
  deletedBy?: number;

  @BeforeInsert()
  setUpdatedByBeforeInsert?() {
    this.setUpdatedBy();
  }

  setUpdatedBy?() {
    if (!this.updatedBy) {
      this.updatedBy = this.createdBy;
    }
  }
}

export class CoreEntityNoUser implements IEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 100 })
  clientId?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
}

export class CoreEntityNoId implements IEntity {
  @Column({ nullable: true, length: 100 })
  clientId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ readonly: true, nullable: true })
  createdBy: number;

  @Column({ nullable: true })
  updatedBy: number;

  @Column({ nullable: true })
  deletedBy: number;
}
