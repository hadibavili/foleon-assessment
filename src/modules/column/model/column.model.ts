import { Exclude } from 'class-transformer';
import {
  PrimaryKey,
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { Content } from '../../content/model/content.model';
import { ContentColumn } from '../../content/model/contentColumn.model';
import { Row } from '../../row/model/row.model';
import { ColumnRow } from './columnRow.model';

@Table({
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'columns',
})
export class Columns extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  name: string;

  @BelongsToMany(() => Row, () => ColumnRow)
  rows: Row[];

  @BelongsToMany(() => Content, () => ContentColumn)
  content: Content[];

  created_at: Date;

  updated_at: Date;
}
