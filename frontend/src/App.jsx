// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Taskdashboard from './pages/TaskDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Taskdashboard />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={< LoginPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
