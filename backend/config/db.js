require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance using your environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    // Optional: disable logging of every SQL query
    logging: false, 
  }
);

module.exports = sequelize;