import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-700 mb-4">
            Welcome to ALASH - your learning platform. We are dedicated to providing quality education...
          </p>
          <p className="text-gray-700">
            This is a test page to verify server-side routing functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;