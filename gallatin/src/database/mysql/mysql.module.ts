import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Config } from '@app/common/config';
import { Task } from '@app/domain/task/models';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: Config.mysql.host,
      port: Config.mysql.port,
      username: Config.mysql.username,
      password: Config.mysql.password,
      database: Config.mysql.database,
      autoLoadModels: true,
      synchronize: true,
      models: [Task],
    }),
  ],
  exports: [],
})
export class MysqlModule {}
