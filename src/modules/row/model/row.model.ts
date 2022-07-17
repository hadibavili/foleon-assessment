import {
  PrimaryKey,
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { Page } from '../../page/model/page.model';
import { Columns } from '../../column/model/column.model';
import { RowPage } from './rowPage.model';
import { ColumnRow } from '../../column/model/columnRow.model';

@Table({
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'rows',
})
export class Row extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  name: string;

  @BelongsToMany(() => Page, () => RowPage)
  pages: Page[];

  @BelongsToMany(() => Columns, () => ColumnRow)
  columns: Columns[];

  created_at: Date;

  updated_at: Date;
}
