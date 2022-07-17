import {
  PrimaryKey,
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
} from 'sequelize-typescript';

import { ContentTypeEnum } from '../constant/contentType.enum';

@Table({
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'contents',
})
export class Content extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  value: number;

  @Column({
    type: DataType.ENUM({ values: Object.values(ContentTypeEnum) }),
  })
  type: ContentTypeEnum;

  created_at: Date;

  updated_at: Date;
}
