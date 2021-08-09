const sequelize = require('sequelize');
const db = require('../database');

const { DataTypes } = sequelize;

const Users = db.define('users', {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
});

module.exports = Users;
