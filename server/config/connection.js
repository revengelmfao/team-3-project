import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'database_development', // Database name
  'postgres', // Username
  'PaigeR@2005', // Password
  {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
      decimalNumbers: true,
    },
  }
);

export default sequelize;
