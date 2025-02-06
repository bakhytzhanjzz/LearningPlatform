import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Menu, X } from 'lucide-react';
import Profile from './Profile';
import About from './About';
import Contact from './components/Contact';
import Help from './components/Help';
import CourseList from './components/Courses/CourseList';
import MyCourses from './components/Courses/MyCourses';
import CourseDetail from './components/Courses/CourseDetail';
import LessonView from './components/Courses/LessonView';
import VerificationForm from './components/VerificationForm';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Navigation Component
const Navigation = ({ isLoggedIn, setShowLogin, setShowSignup, handleLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg relative">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavigation('/')} 
            className="text-xl font-bold cursor-pointer hover:text-blue-500"
          >
            ALASH
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && (
              <>
                <button 
                  onClick={() => handleNavigation('/courses')} 
                  className="hover:text-blue-500 px-2 transition-colors"
                >
                  My Courses
                </button>
                <button 
                  onClick={() => handleNavigation('/profile')} 
                  className="hover:text-blue-500 px-2 transition-colors"
                >
                  My Profile
                </button>
              </>
            )}
            <button 
              onClick={() => handleNavigation('/about')} 
              className="hover:text-blue-500 px-2 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('/help')} 
              className="hover:text-blue-500 px-2 transition-colors"
            >
              Help
            </button>
            <button 
              onClick={() => handleNavigation('/contact')} 
              className="hover:text-blue-500 px-2 transition-colors"
            >
              Contact
            </button>
            
            {!isLoggedIn ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {isLoggedIn && (
                <>
                  <button 
                    onClick={() => handleNavigation('/courses')} 
                    className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                  >
                    My Courses
                  </button>
                  <button 
                    onClick={() => handleNavigation('/profile')} 
                    className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                  >
                    My Profile
                  </button>
                </>
              )}
              <button 
                onClick={() => handleNavigation('/about')} 
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                About
              </button>
              <button 
                onClick={() => handleNavigation('/help')} 
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                Help
              </button>
              <button 
                onClick={() => handleNavigation('/contact')} 
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                Contact
              </button>
              
              {!isLoggedIn ? (
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setShowSignup(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors mt-2"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Login Form Component
const LoginForm = ({ onClose, onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto">
        <div className="p-6">
          <h2 className="text-2xl mb-4 font-bold">Login</h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full border border-gray-300 p-2 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Signup Form Component
const SignupForm = ({ onClose, onSignup, error }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      onSignup({ error: 'Passwords do not match' });
      return;
    }
    onSignup({ name, email, password });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto">
        <div className="p-6">
          <h2 className="text-2xl mb-4 font-bold">Sign Up</h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium">Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full border border-gray-300 p-2 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Home Component
const Home = () => (
  <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
    <CourseList />
  </main>
);

// Main App Component
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [pendingVerification, setPendingVerification] = useState(null);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          const errorCode = error.response?.data?.code;
          
          // Если сессия истекла из-за входа на другом устройстве
          if (errorCode === 'SESSION_EXPIRED') {
            // Очищаем локальное хранилище
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            
            // Сбрасываем состояние приложения
            setIsLoggedIn(false);
            setCurrentUser(null);
            
            // Показываем уведомление пользователю
            setError('Your session has ended because you logged in on another device');
          }
          // Если токен просто истек
          else if (errorCode === 'TOKEN_EXPIRED') {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            setIsLoggedIn(false);
            setCurrentUser(null);
            setError('Your session has expired. Please log in again');
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (token && userId) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get(`/api/auth/profile?userId=${userId}`);
          setIsLoggedIn(true);
          setCurrentUser(response.data);
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          delete axios.defaults.headers.common['Authorization'];
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      }
    };
    
    checkAuthStatus();
  }, []);

  const handleSignup = async (signupData) => {
    if (signupData.error) {
      setError(signupData.error);
      return;
    }
    try {
      console.log('Sending signup request:', {
        name: signupData.name,
        email: signupData.email
      });

      const response = await axios.post('/api/auth/register', signupData);
      console.log('Signup response:', response.data);

      setPendingVerification({
        email: signupData.email,
        type: 'registration'
      });
      setError('');
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'Registration failed';
      console.error('Signup error:', errorMessage);
      setError(errorMessage);
    }
  };

  const handleLogin = async (loginData) => {
    try {
      console.log('Sending login request:', { email: loginData.email });
      
      const response = await axios.post('/api/auth/login', loginData);
      console.log('Login response:', response.data);

      if (response.data.token) {
        // Если сервер не требует верификации
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user.id);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        setIsLoggedIn(true);
        setCurrentUser(response.data.user);
        setShowLogin(false);
      } else {
        // Если требуется верификация
        setPendingVerification({
          email: loginData.email,
          type: 'login'
        });
      }
      setError('');
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'Login failed';
      console.error('Login error:', errorMessage);
      setError(errorMessage);
    }
  };

  const handleVerification = async (code) => {
    try {
      const endpoint = pendingVerification.type === 'registration' 
        ? '/api/auth/verify-email' 
        : '/api/auth/verify-login';
        
      const response = await axios.post(endpoint, {
        email: pendingVerification.email,
        code
      });

      if (pendingVerification.type === 'registration') {
        setPendingVerification(null);
        setShowSignup(false);
        setShowLogin(true);
      } else {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user.id);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsLoggedIn(true);
        setCurrentUser(user);
        setPendingVerification(null);
        setShowLogin(false);
      }
      setError('');
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'Verification failed';
      console.error('Verification error:', errorMessage);
      setError(errorMessage);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post('/api/auth/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      delete axios.defaults.headers.common['Authorization'];
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation
          isLoggedIn={isLoggedIn}
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
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
            path="/courses"
            element={
              isLoggedIn ? (
                <MyCourses />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route
            path="/courses/:courseId/lessons/:lessonIndex"
            element={
              isLoggedIn ? (
                <LessonView />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>

        {showSignup && !pendingVerification && (
          <SignupForm
            onClose={() => {
              setShowSignup(false);
              setError('');
            }}
            onSignup={handleSignup}
            error={error}
          />
        )}

        {showLogin && !pendingVerification && (
          <LoginForm
            onClose={() => {
              setShowLogin(false);
              setError('');
            }}
            onLogin={handleLogin}
            error={error}
          />
        )}

        {pendingVerification && (
          <VerificationForm
            email={pendingVerification.email}
            type={pendingVerification.type}
            onVerify={handleVerification}
            onCancel={() => {
              setPendingVerification(null);
              setError('');
            }}
          />
        )}
      </div>
    </Router>
  );
};

export default App;