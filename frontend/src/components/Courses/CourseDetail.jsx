// src/components/Courses/CourseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        console.log('Fetching course:', courseId);
        const response = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
        console.log('Course data:', response.data);
        setCourse(response.data);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err.response?.data?.message || 'Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading course details...</div>
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

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Course not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-500 hover:text-blue-700"
      >
        ← Back to Courses
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <div className="flex items-center mb-4">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {course.level}
            </span>
            <span className="mx-4 text-gray-500">
              Duration: {course.duration}
            </span>
            <span className="text-2xl font-bold text-green-600">
              ${course.price}
            </span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About this course</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
            {course.lessons && course.lessons.length > 0 ? (
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">{lesson.title}</h3>
                    <p className="text-gray-600">{lesson.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No lessons available yet.</p>
            )}
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Instructor: {course.instructor}</p>
              </div>
              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem('token');
                    if (!token) {
                      alert('Please login to enroll');
                      return;
                    }
                    
                    await axios.post(
                      `http://localhost:5000/api/courses/enroll/${course._id}`,
                      {},
                      {
                        headers: {
                          'Authorization': `Bearer ${token}`
                        }
                      }
                    );
                    alert('Successfully enrolled in course!');
                    navigate('/courses'); // Перенаправляем на страницу моих курсов
                  } catch (err) {
                    alert(err.response?.data?.message || 'Failed to enroll in course');
                  }
                }}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;