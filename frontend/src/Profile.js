import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user }) => {
  console.log('Profile component received user:', user);
  const navigate = useNavigate();
  const modalRef = useRef();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData(user);
      setLoading(false);
    } else {
      // If no user prop, try to fetch from backend
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          const userId = localStorage.getItem('userId');
          
          if (!token || !userId) {
            navigate('/');
            return;
          }

          const response = await fetch(`http://localhost:5000/api/auth/profile?userId=${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          const data = await response.json();
          if (response.ok) {
            setProfileData(data);
          } else {
            console.error('Failed to fetch profile:', data.msg);
            navigate('/');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          navigate('/');
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [user, navigate]);

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

  if (!profileData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-[480px] max-w-full">
          <div className="p-6">
            <p>No profile data available</p>
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
              {profileData.name?.charAt(0).toUpperCase() || '?'}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{profileData.name || "Unknown"}</h3>
              <p className="text-gray-600">{profileData.email || 'No Email Provided'}</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">Account Information</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Member Since</p>
                  <p className="font-medium">
                    {profileData.createdAt 
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
        </div>
      </div>
    </div>
  );
};

export default Profile;