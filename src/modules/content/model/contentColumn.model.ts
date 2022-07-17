import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Columns } from '../../column/model/column.model';
import { Content } from './content.model';

@Table({
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'contentColumns',
})
export class ContentColumn extends Model {
  @ForeignKey(() => Columns)
  @Column
  column_id: number;

  @ForeignKey(() => Content)
  @Column
  content_id: number;
}
