// models/task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // make sure this path correctly imports the same sequelize instance

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('todo', 'in-progress', 'done'),
    defaultValue: 'todo',
  }
});

module.exports = Task;
