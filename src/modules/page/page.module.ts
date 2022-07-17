import { Module, forwardRef } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Page } from './model/page.model';
import { RowModule } from '../row/row.module';
@Module({
  imports: [forwardRef(() => RowModule), SequelizeModule.forFeature([Page])],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
