import { Column, ColumnOptions } from 'typeorm';
import { EncryptTransformer } from './transformers/encrypt.transformer';
import { HashTransformer } from './transformers/hash.transformer';
import { FloatTransformer } from './transformers/float.transformer';

export const EnumColumn = (options: ColumnOptions = {}) =>
  Column({
    type: 'nvarchar',
    length: 100,
    ...options,
  });

export const BooleanColumn = (options: ColumnOptions = {}) =>
  Column({
    type: 'tinyint',
    default: 0,
    ...options,
  });

export const EncryptColumn = (options: ColumnOptions = {}) =>
  Column({
    transformer: new EncryptTransformer(),
    ...options,
  });

export const HashColumn = (options: ColumnOptions = {}) =>
  Column({
    transformer: new HashTransformer(),
    ...options,
  });

export const FloatColumn = (options: ColumnOptions = {}, round: number = 4) =>
  Column({
    type: 'float',
    transformer: new FloatTransformer(round),
    ...options,
  });
