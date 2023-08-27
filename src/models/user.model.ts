import { DataTypes } from 'sequelize'
import { db } from '../instances/db.config';

export const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING
});