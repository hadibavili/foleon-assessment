import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Page } from '../../page/model/page.model';
import { Row } from './row.model';

@Table({
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'rowPages',
})
export class RowPage extends Model {
  @ForeignKey(() => Page)
  @Column
  page_id: number;

  @ForeignKey(() => Row)
  @Column
  row_id: number;
}
