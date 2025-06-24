import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Reset error message

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      console.log('Submitting signup form with:', { name, email, password });
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/signup`;
      
      
      await axios.post(apiUrl, {
        name,
        email,
        password,
      });

      // On successful signup, navigate to the login page
      navigate('/login');

    } catch (err) {
      // Handle errors from the API (e.g., email already exists)
      setError(err.response?.data?.message || 'An error occurred during signup.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white border-2 border-black p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">Task Manager</h1>
          <p className="text-black mt-2">Create your account</p>
        </div>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-black mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-2 border-black bg-white text-black focus:outline-none"
              placeholder="Enter your name"
            />
          </div>
          
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
          
          <div>
            <label className="block text-black mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border-2 border-black bg-white text-black focus:outline-none"
              placeholder="Confirm your password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white p-3 hover:bg-gray-800 transition-colors"
          >
            Sign Up
          </button>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-black">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="underline hover:no-underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;