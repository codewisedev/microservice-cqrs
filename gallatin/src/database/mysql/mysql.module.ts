import { Module } from '@nestjs/common';
import { mysqlProviders } from '@database/mysql/mysql.providers';

@Module({
  providers: [...mysqlProviders],
  exports: [...mysqlProviders],
})
export class MysqlModule {}
