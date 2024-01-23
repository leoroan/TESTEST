import { Sequelize } from "sequelize";

const database = "testINV";
const username = "postgres";
const password = "admin";
const host = "localhost";

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
});

export { sequelize };