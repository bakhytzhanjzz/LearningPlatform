import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        if (!token || !userId) {
          navigate('/');
          return;
        }

        // Загрузка профиля и курсов параллельно
        const [profileResponse, coursesResponse] = await Promise.all([
          axios.get(`/api/auth/profile?userId=${userId}`),
          axios.get('/api/courses/my-courses')
        ]);

        setProfileData(profileResponse.data);
        setEnrolledCourses(coursesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      setProfileData(user);
      fetchData();
    } else {
      fetchData();
    }
  }, [user, navigate]);

  const handleUnenroll = async (courseId) => {
    try {
      await axios.post(`/api/courses/${courseId}/unenroll`);
      setEnrolledCourses(prev => prev.filter(course => course._id !== courseId));
    } catch (err) {
      console.error('Error unenrolling from course:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto p-4">
          <p className="text-center">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">User Profile</h2>
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mb-4 sm:mb-0 sm:mr-4">
              {profileData?.name?.charAt(0).toUpperCase() || '?'}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold">{profileData?.name || "Unknown"}</h3>
              <p className="text-gray-600">{profileData?.email || 'No Email Provided'}</p>
            </div>
          </div>

          {/* Account Information */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Account Information</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Member Since</p>
                  <p className="font-medium">
                    {profileData?.createdAt 
                      ? new Date(profileData.createdAt).toLocaleDateString()
                      : 'Not available'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className="font-medium text-green-600">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-3">My Courses</h4>
            <div className="space-y-4">
              {enrolledCourses.map(course => (
                <div key={course._id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                    <h5 className="font-medium">{course.title}</h5>
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <button
                        onClick={() => navigate(`/courses/${course._id}`)}
                        className="flex-1 sm:flex-none text-center bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition-colors"
                      >
                        Continue
                      </button>
                      <button
                        onClick={() => handleUnenroll(course._id)}
                        className="flex-1 sm:flex-none text-center bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors"
                      >
                        Unenroll
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {enrolledCourses.length === 0 && (
                <p className="text-gray-500 text-center py-4">No courses enrolled yet</p>
              )}
            </div>
          </div>
          
          {/* Additional Section for Future Features */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Progress Overview</h4>
            <p className="text-gray-600">
              Track your learning journey and achievements here. More features coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;