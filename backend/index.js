const express = require('express');
const cors = require('cors'); // 👈 Add this line
const bodyParser = require('body-parser');
require('dotenv').config();
const { Sequelize } = require('sequelize');

// ---------- 1. Database Connection ----------
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

sequelize.sync();

// ---------- 2. Models & Associations ----------
const User = require('./models/user');
const Task = require('./models/task');

User.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(User, { foreignKey: 'user_id' });

// ---------- 3. Express App Setup ----------
const app = express();
app.use(cors()); // ✅ Enable CORS here
app.use(bodyParser.json());

// ---------- 4. Routes ----------
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api', userRoutes);
app.use('/api/tasks', taskRoutes);

// ---------- 5. Start Server ----------
const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
