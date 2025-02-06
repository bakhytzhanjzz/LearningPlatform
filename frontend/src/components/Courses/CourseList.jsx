import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Добавляем импорт

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Инициализируем хук

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses`);
        console.log('API Response:', response.data);
        
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          setError('Invalid data format received from server');
          console.error('Invalid data format:', response.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch courses');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to enroll in courses');
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/courses/enroll/${courseId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert('Successfully enrolled in course!');
    } catch (err) {
      console.error('Error enrolling in course:', err);
      alert(err.response?.data?.message || 'Failed to enroll in course');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={course.image || '/api/placeholder/400/300'} 
              alt={course.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">Duration: {course.duration}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {course.level}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">${course.price}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => navigate(`/courses/${course._id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View Course
                  </button>
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;