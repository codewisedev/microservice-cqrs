import { Module } from '@nestjs/common';
import { MysqlModule } from '@database/mysql/mysql.module';

@Module({
  imports: [MysqlModule],
})
export class DatabaseModule {}
