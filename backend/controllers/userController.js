const User = require('../models/User'); // Adjust the path as necessary

// POST /api/signup - Create new user
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Optional: check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const newUser = await User.create({ name, email, password }); // you can hash password later
    res.status(201).json({ message: 'User created successfully!', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// POST /api/login - Authenticate user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password (plain for now; use bcrypt in production)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // In production, return JWT token here
    res.status(200).json({ message: 'Login successful', userId: user.id, name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
