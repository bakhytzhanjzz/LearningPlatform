import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (err) {
      setError('Error fetching users');
      console.error('Error:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, loginData);
      setSuccessMessage('Login successful!');
      setIsLoggedIn(true);
      setCurrentUser(response.data);
      setShowLogin(false);
      setLoginData({ email: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post(`${API_URL}/register`, {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password
      });
      setSuccessMessage('Registration successful! Please login.');
      setShowSignup(false);
      setSignupData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSuccessMessage('Logged out successfully');
  };

  const LoginForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4 font-bold">Login</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1">Email:</label>
            <input 
              type="email" 
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              className="w-full border p-2 rounded" 
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input 
              type="password" 
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              className="w-full border p-2 rounded" 
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
          <button 
            type="button"
            onClick={() => {
              setShowLogin(false);
              setError('');
            }}
            className="w-full border border-gray-300 p-2 rounded mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );

  const SignupForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4 font-bold">Sign Up</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block mb-1">Full Name:</label>
            <input 
              type="text" 
              value={signupData.name}
              onChange={(e) => setSignupData({...signupData, name: e.target.value})}
              className="w-full border p-2 rounded" 
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email:</label>
            <input 
              type="email" 
              value={signupData.email}
              onChange={(e) => setSignupData({...signupData, email: e.target.value})}
              className="w-full border p-2 rounded" 
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input 
              type="password" 
              value={signupData.password}
              onChange={(e) => setSignupData({...signupData, password: e.target.value})}
              className="w-full border p-2 rounded" 
              required
            />
          </div>
          <div>
            <label className="block mb-1">Confirm Password:</label>
            <input 
              type="password" 
              value={signupData.confirmPassword}
              onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
              className="w-full border p-2 rounded" 
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
          <button 
            type="button"
            onClick={() => {
              setShowSignup(false);
              setError('');
            }}
            className="w-full border border-gray-300 p-2 rounded mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-100 text-green-700 p-4 rounded shadow-lg">
          {successMessage}
        </div>
      )}

      <nav className="bg-white shadow-lg">
        <div className="w-full px-2">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold pl-2">ALASH</div>
            <div className="flex space-x-2 pr-2">
              <button className="hover:text-blue-500 px-2">My Courses</button>
              <button className="hover:text-blue-500 px-2">My Profile</button>
              <button className="hover:text-blue-500 px-2">About</button>
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

      <main className="max-w-8xl mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
        
        {isLoggedIn && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map(user => (
                <div key={user._id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="font-bold">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-500">Courses will be displayed here...</p>
          </div>
        </div>
      </main>

      {showLogin && <LoginForm />}
      {showSignup && <SignupForm />}
    </div>
  );
};

export default App;