import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CourseProgress from './CourseProgress';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please login to view your courses');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/courses/my-courses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (Array.isArray(response.data)) {
          // Получаем прогресс для каждого курса
          const coursesWithProgress = await Promise.all(
            response.data.map(async (course) => {
              try {
                const progressResponse = await axios.get(
                  `http://localhost:5000/api/courses/${course._id}/progress`,
                  {
                    headers: { 'Authorization': `Bearer ${token}` }
                  }
                );
                return { ...course, progress: progressResponse.data };
              } catch (err) {
                console.error(`Error fetching progress for course ${course._id}:`, err);
                return { ...course, progress: null };
              }
            })
          );
          setCourses(coursesWithProgress);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.response?.data?.message || 'Failed to fetch your courses');
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  const handleContinueLearning = async (course) => {
    try {
      // Если есть прогресс, находим следующий незавершенный урок
      if (course.progress?.completedLessons) {
        const completedLessons = course.progress.completedLessons;
        const nextLessonIndex = completedLessons.length;
        
        // Проверяем, есть ли следующий урок
        if (nextLessonIndex < course.lessons.length) {
          navigate(`/courses/${course._id}/lessons/${nextLessonIndex}`);
          return;
        }
      }
      
      // Если прогресса нет или все уроки завершены, начинаем с первого урока
      navigate(`/courses/${course._id}/lessons/0`);
    } catch (error) {
      console.error('Error continuing course:', error);
      alert('Error loading course content');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading your courses...</div>
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
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      {!Array.isArray(courses) || courses.length === 0 ? (
        <div className="text-center text-gray-500">
          You haven't enrolled in any courses yet.
        </div>
      ) : (
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
                
                {/* Добавляем прогресс курса */}
                <CourseProgress 
                  progress={course.progress} 
                  totalLessons={course.lessons?.length || 0}
                  course={course} // Добавляем сам курс
                />

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleContinueLearning(course)}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;