import { Module } from '@nestjs/common';
import { PageModule } from './modules/page/page.module';
import { ContentModule } from './modules/content/content.module';
import 'dotenv/config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RowModule } from './modules/row/row.module';
import { ColumnModule } from './modules/column/column.module';
import SequelizeConfig from '../config/sequelize.config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule.forFeature(SequelizeConfig)],
      inject: [SequelizeConfig.KEY],
      useFactory: (config: ConfigType<typeof SequelizeConfig>) => config,
    }),
    PageModule,
    ContentModule,
    RowModule,
    ColumnModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
