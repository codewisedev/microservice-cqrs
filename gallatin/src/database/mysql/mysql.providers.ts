import { Sequelize } from 'sequelize-typescript';
import { Config } from '@common/config';

export const mysqlProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: Config.mysql.host,
        port: Config.mysql.port,
        username: Config.mysql.username,
        password: Config.mysql.password,
        database: Config.mysql.database,
      });
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
