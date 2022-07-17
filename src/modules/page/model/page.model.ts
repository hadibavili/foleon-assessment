import {
  PrimaryKey,
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { RowPage } from '../../row/model/rowPage.model';
import { Row } from '../../row/model/row.model';

@Table({
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'pages',
})
export class Page extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  name: string;

  // @HasMany(() => Row)
  // rows: Row[];

  @BelongsToMany(() => Row, () => RowPage)
  rows: Row[];

  created_at: Date;

  updated_at: Date;
}
