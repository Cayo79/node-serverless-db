import { DataTypes, Optional, Model } from 'sequelize';
import { db } from '../instances/db.config';

interface UserAttributes {
    id: number;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
export type UserInput = Optional<UserAttributes, 'id'>
export type UserOuput = Required<UserAttributes>

class UserModel extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public email: string;
  public password: string;
  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const User = UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    timestamps: true,
    sequelize: db,
    tableName: 'users',
    paranoid: false,
  }
);