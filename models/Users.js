const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./Roles');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    section_order: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.STRING(255),
    },
    provider: {
      type: DataTypes.STRING(255),
    },
    profile_pic: {
      type: DataTypes.TEXT,
    },
    refresh_token: {
      type: DataTypes.STRING(255),
    },
    role_id: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      allowNull: false,
      references: {
        model: Role,
        key: 'id',
      },
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    two_factor_auth: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    location: {
      type: DataTypes.STRING(255),
    },
    country: {
      type: DataTypes.STRING(255),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

User.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = User;
