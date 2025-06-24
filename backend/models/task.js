const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending' // e.g., 'pending', 'in-progress', 'completed'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false // ensure every task is linked to a user
  }
}, {
  timestamps: true // createdAt and updatedAt will be managed automatically
});

module.exports = Task;
