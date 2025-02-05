// Profile.js
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = ({ user }) => {
  console.log('Profile component received user:', user);
  const navigate = useNavigate();
  const modalRef = useRef();
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

        // Загрузка профиля
        const profileResponse = await fetch(`http://localhost:5000/api/auth/profile?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const profileData = await profileResponse.json();
        if (profileResponse.ok) {
          setProfileData(profileData);
        }

        // Загрузка курсов
        const coursesResponse = await axios.get('http://localhost:5000/api/courses/my-courses', {
          headers: { Authorization: `Bearer ${token}` }
        });
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
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/courses/${courseId}/unenroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEnrolledCourses(prev => prev.filter(course => course._id !== courseId));
    } catch (err) {
      console.error('Error unenrolling from course:', err);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-[480px] max-w-full">
          <div className="p-6">
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-[480px] max-w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">User Profile</h2>
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mr-4">
              {profileData?.name?.charAt(0).toUpperCase() || '?'}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{profileData?.name || "Unknown"}</h3>
              <p className="text-gray-600">{profileData?.email || 'No Email Provided'}</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Account Information</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
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

          {/* Enrolled Courses Section */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-3">My Courses</h4>
            <div className="space-y-4">
              {enrolledCourses.map(course => (
                <div key={course._id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">{course.title}</h5>
                    <div className="space-x-2">
                      <button
                        onClick={() => navigate(`/courses/${course._id}`)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Continue
                      </button>
                      <button
                        onClick={() => handleUnenroll(course._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Unenroll
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {enrolledCourses.length === 0 && (
                <p className="text-gray-500 text-center">No courses enrolled yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;