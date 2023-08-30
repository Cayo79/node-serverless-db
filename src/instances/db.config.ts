import { Sequelize, Dialect } from 'sequelize';
import { env } from './env';
const dbDriver = 'mysql' as Dialect;

let db;
(async ()=>{
  try {
    db = new Sequelize(env.database, env.username, env.password, {
      host: env.host,
      port: env.port,
      dialect: dbDriver,
      pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
      }
    });

    // Test the connection
    await db.authenticate();
    // eslint-disable-next-line no-console
    console.log('Database connection established successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error connecting to the database:', error);
  }

})();

export default db;
