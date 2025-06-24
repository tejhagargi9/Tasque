import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, User, LogOut } from 'lucide-react';

const SignupPage = ({ onSignup, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (name && email && password && password === confirmPassword) {
      onSignup({ email, name });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white border-2 border-black p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">Task Manager</h1>
          <p className="text-black mt-2">Create your account</p>
        </div>
        
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
            onClick={handleSubmit}
            className="w-full bg-black text-white p-3 hover:bg-gray-800 transition-colors"
          >
            Sign Up
          </button>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-black">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="underline hover:no-underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;