import { Sequelize } from 'sequelize-typescript';
import User from '../models/User';
import Role from '../models/Role';
import RolesPermissions from '../models/RolePermission';
import Permission from '../models/Permission';
import PasswordResetToken from '../models/PasswordResetToken';
import dotenv from 'dotenv'; // ES6 import for dotenv
dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  logging: false,
});

sequelize.addModels([Role]);
sequelize.addModels([User]);
sequelize.addModels([Permission]);
sequelize.addModels([PasswordResetToken]);
sequelize.addModels([RolesPermissions]);
export default sequelize;
