import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';
import About from './About';

const API_URL = 'http://localhost:5000/api/auth';

const Navigation = ({ isLoggedIn, setShowLogin, setShowSignup, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg">
      <div className="w-full px-2">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold pl-2">ALASH</div>
          <div className="flex space-x-2 pr-2">
            <button className="hover:text-blue-500 px-2">My Courses</button>
            {isLoggedIn && (
              <button onClick={() => navigate('/profile')} className="hover:text-blue-500 px-2">
                My Profile
              </button>
            )}
            <button onClick={() => navigate('/about')} className="hover:text-blue-500 px-2">
              About
            </button>
            <button className="hover:text-blue-500 px-2">Help</button>
            <button className="hover:text-blue-500 px-2">Contact</button>
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const LoginForm = ({ onClose, onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4 font-bold">Login</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full border border-gray-300 p-2 rounded mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const SignupForm = ({ onClose, onSignup, error }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      onSignup({ error: 'Passwords do not match' });
      return;
    }
    onSignup({ name, email, password });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4 font-bold">Sign Up</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full border border-gray-300 p-2 rounded mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const AppWrapper = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, loginData);
        const { token, user, msg } = response.data;
        
        console.log("Received user data:", user); // Add this to debug
        
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user.id);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setIsLoggedIn(true);
        setCurrentUser(user); // This should now contain the user data
        setShowLogin(false);
        setError('');
    } catch (err) {
        console.error('Login error:', err);
        setError(err.response?.data?.msg || 'Login failed');
    }
};

  const handleSignup = async (signupData) => {
    if (signupData.error) {
      setError(signupData.error);
      return;
    }
    try {
      await axios.post(`${API_URL}/register`, {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
      });
      setShowSignup(false);
      setShowLogin(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  useEffect(() => {
  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`${API_URL}/verify`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsLoggedIn(true);
        setCurrentUser(response.data);
      } catch (err) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    }
  };
  
  checkAuthStatus();
}, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        isLoggedIn={isLoggedIn}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <Profile user={currentUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/"
          element={
            <main className="max-w-8xl mx-auto px-8 py-8">
              <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
            </main>
          }
        />
      </Routes>
      {showLogin && (
        <LoginForm
          onClose={() => {
            setShowLogin(false);
            setError('');
          }}
          onLogin={handleLogin}
          error={error}
        />
      )}
      {showSignup && (
        <SignupForm
          onClose={() => {
            setShowSignup(false);
            setError('');
          }}
          onSignup={handleSignup}
          error={error}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;