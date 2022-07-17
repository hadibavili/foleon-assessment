import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import SequelizeConfig from '../config/sequelize.config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule.forFeature(SequelizeConfig)],
      inject: [SequelizeConfig.KEY],
      useFactory: (config: ConfigType<typeof SequelizeConfig>) => config,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
