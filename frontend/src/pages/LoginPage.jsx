import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Reset error

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/login`;
      
      const response = await axios.post(apiUrl, {
        email,
        password,
      });

      // On successful login, save auth state and user info
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', response.data.token);

      // Store user data returned from the backend
      localStorage.setItem('user', JSON.stringify({
        id: response.data.userId,
        name: response.data.name,
        email: email, // The backend doesn't return email, so we add it here
      }));
      
      // Redirect to the dashboard
      navigate('/dashboard');

    } catch (err) {
      // Handle errors from the API (e.g., user not found, invalid credentials)
      setError(err.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white border-2 border-black p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">Task Manager</h1>
          <p className="text-black mt-2">Sign in to your account</p>
        </div>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-black mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-black bg-white text-black focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-black mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-black bg-white text-black focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white p-3 hover:bg-gray-800 transition-colors"
          >
            Sign In
          </button>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-black">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="underline hover:no-underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;