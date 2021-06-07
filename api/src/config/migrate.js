require('./../models');
import { sequelize } from './';

export const migrateDb = async () => {
  await sequelize.sync();
}
