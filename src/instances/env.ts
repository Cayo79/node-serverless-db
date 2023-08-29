export const env = {
  database: process.env.DATABASE || '',
  username: process.env.USERNAME_DB || '',
  password: process.env.PASSWORD_DB || '',
  host: process.env.HOST || '',
  port: Number(process.env.BD_PORT) || 4000,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
