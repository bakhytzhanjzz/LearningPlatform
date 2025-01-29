import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        console.log('API Response:', response.data); // Для отладки
        
        // Проверяем, что response.data это массив
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else if (response.data.courses && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
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

  // Добавим тестовые данные, пока бэкенд не готов
  const dummyCourses = [
    {
      _id: '1',
      title: 'Introduction to Web Development',
      description: 'Learn the basics of HTML, CSS, and JavaScript',
      duration: '8 weeks',
      level: 'Beginner',
      price: 99.99,
      image: '/api/placeholder/400/300'
    },
    {
      _id: '2',
      title: 'React Fundamentals',
      description: 'Master React.js and modern frontend development',
      duration: '10 weeks',
      level: 'Intermediate',
      price: 149.99,
      image: '/api/placeholder/400/300'
    },
    {
      _id: '3',
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js',
      duration: '12 weeks',
      level: 'Advanced',
      price: 199.99,
      image: '/api/placeholder/400/300'
    }
  ];

  // Используем тестовые данные, если нет данных с сервера
  const displayCourses = courses.length > 0 ? courses : dummyCourses;

  const handleEnroll = async (courseId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/courses/enroll/${courseId}`);
      console.log('Enrollment response:', response.data);
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
      <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCourses.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={course.image} 
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
                <button
                  onClick={() => handleEnroll(course._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;