import { Module, forwardRef } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Content } from './model/content.model';
import { ContentColumn } from './model/contentColumn.model';
import { ColumnModule } from '../column/column.module';

@Module({
  imports: [
    forwardRef(() => ColumnModule),
    SequelizeModule.forFeature([Content, ContentColumn]),
  ],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
