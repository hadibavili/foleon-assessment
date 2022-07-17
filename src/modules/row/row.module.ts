import { Module, forwardRef } from '@nestjs/common';
import { RowService } from './row.service';
import { RowsController } from './row.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Row } from './model/row.model';
import { RowPage } from './model/rowPage.model';
import { PageModule } from '../page/page.module';
import { ColumnModule } from '../column/column.module';

@Module({
  imports: [
    forwardRef(() => PageModule),
    forwardRef(() => ColumnModule),
    SequelizeModule.forFeature([Row, RowPage]),
  ],
  controllers: [RowsController],
  providers: [RowService],
  exports: [RowService],
})
export class RowModule {}
