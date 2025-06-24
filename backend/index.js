require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/db');

// Enable CORS
app.use(cors({
  origin: '*',
  credentials: true // optional if you use cookies
}));

// Parse JSON
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
app.use('/api', userRoutes);
app.use('/api/tasks', taskRoutes);

// Database setup
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync({ force: true }); // Set force: true to drop tables and recreate them
  })
  .then(() => {
    console.log('Database synced...');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('DB connection or sync failed:', err);
  });
