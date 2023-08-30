import {
  User
} from '../models';

const dbInit = () => Promise.all([
  User.sync({ alter: false }),
]);

export default dbInit;
