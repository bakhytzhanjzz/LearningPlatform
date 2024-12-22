import React, { useState } from 'react';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const LoginForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4 font-bold">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Email:</label>
            <input type="email" className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input type="password" className="w-full border p-2 rounded" />
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
          <button 
            onClick={() => setShowLogin(false)}
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
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Full Name:</label>
            <input type="text" className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block mb-1">Email:</label>
            <input type="email" className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block mb-1">Password:</label>
            <input type="password" className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block mb-1">Confirm Password:</label>
            <input type="password" className="w-full border p-2 rounded" />
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
          <button 
            onClick={() => setShowSignup(false)}
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
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-8xl mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
        
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