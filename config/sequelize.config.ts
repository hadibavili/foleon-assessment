import { registerAs } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize/dist/interfaces/sequelize-options.interface';
import 'dotenv/config';

export default registerAs('SerializeConfig', () => {
  return <SequelizeModuleOptions>{
    dialect: 'mysql',
    logging: Boolean(process.env.SEQUELIZE_LOGGING),
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV === 'development',
    autoLoadModels: true,
  };
});
