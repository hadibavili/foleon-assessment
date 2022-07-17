import { Module, forwardRef } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { Columns } from './model/column.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ColumnRow } from './model/columnRow.model';
import { RowModule } from '../row/row.module';
import { ContentModule } from '../content/content.module';

@Module({
  imports: [
    forwardRef(() => RowModule),
    forwardRef(() => ContentModule),
    SequelizeModule.forFeature([Columns, ColumnRow]),
  ],
  controllers: [ColumnController],
  providers: [ColumnService],
  exports: [ColumnService],
})
export class ColumnModule {}
