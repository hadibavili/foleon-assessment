import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Row } from '../../row/model/row.model';
import { Columns } from './column.model';

@Table({
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'columnRows',
})
export class ColumnRow extends Model {
  @ForeignKey(() => Columns)
  @Column
  column_id: number;

  @ForeignKey(() => Row)
  @Column
  row_id: number;
}
