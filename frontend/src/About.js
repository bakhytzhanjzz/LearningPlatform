import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">About Us</h1>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 space-y-4">
            <p className="text-gray-700">
              Welcome to ALASH - your learning platform. We are dedicated to providing quality education 
              and making learning accessible to everyone.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
                <p className="text-gray-600">
                  To provide high-quality educational content that helps students achieve their learning goals 
                  through interactive and engaging online courses.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
                <p className="text-gray-600">
                  To become a leading platform for online education and professional development, 
                  empowering learners worldwide with knowledge and skills.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">What We Offer</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Video Lessons</h4>
                  <p className="text-gray-600">
                    Interactive video content with expert instructors
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Practice Quizzes</h4>
                  <p className="text-gray-600">
                    Test your knowledge with interactive assessments
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Progress Tracking</h4>
                  <p className="text-gray-600">
                    Monitor your learning journey and achievements
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Our Features</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">Interactive video lessons with expert instructors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">Engaging quizzes and assessments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">Comprehensive progress tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">Professional certification opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">24/7 access to course materials</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Get Started Today</h3>
              <p className="text-gray-600">
                Join our growing community of learners and start your educational journey with ALASH. 
                Browse our courses and begin learning at your own pace.
              </p>
            </div>

            <div className="mt-8 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
              <p className="text-gray-600">
                Have questions or need support? Our team is here to help! Visit our Contact page 
                to reach out to our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;