const Sequelize = require('sequelize');

module.exports = (sequelize, Datatypes) =>
  sequelize.define(
    'user',
    {
      user_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      password: {
        type: Datatypes.STRING(60),
        allowNull: false,
      },
      username: {
        type: Datatypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Datatypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Datatypes.DATE,
        allowNull: false,
        unique: false,
      },
    },
    {
      Sequelize,
      timestamps: false,
      modelName: 'User',
      tableName: 'user',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  );
