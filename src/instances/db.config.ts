import { Sequelize, Dialect } from 'sequelize';
import { env } from './env';

class Database {
  public db;
  constructor() {
    this.db = null;
  }

  async connect() {
    try {
      this.db = new Sequelize(env.database, env.username, env.password, {
        host: env.host,
        port: env.port,
        dialect: 'mysql' as Dialect,
        pool: {
          max: env.pool.max,
          min: env.pool.min,
          acquire: env.pool.acquire,
          idle: env.pool.idle
        }
      });

      await this.db.authenticate();
      // eslint-disable-next-line no-console
      console.log('Database connection established successfully.');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error connecting to the database:', error);
    }
  }
}

const database = new Database();

(async () => {
  await database.connect();
})();

export default database.db;
