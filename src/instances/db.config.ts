import { Sequelize } from 'sequelize'

const env = require('./env');

export const db = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  //logging: false,

  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});