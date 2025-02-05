import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VideoPlayer from '../VideoPlayer';
import Quiz from './Quiz';

const LessonView = () => {
  const { courseId, lessonIndex } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/courses/${courseId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        setCourse(response.data);
        if (response.data.lessons && response.data.lessons[lessonIndex]) {
          setCurrentLesson(response.data.lessons[lessonIndex]);
        } else {
          setError('Lesson not found');
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load lesson content');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, lessonIndex, navigate]);

  const handleLessonComplete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/courses/${courseId}/lessons/${currentLesson._id}/complete`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const nextIndex = parseInt(lessonIndex) + 1;
      if (nextIndex < course?.lessons?.length) {
        navigate(`/courses/${courseId}/lessons/${nextIndex}`);
      }
    } catch (err) {
      console.error('Error completing lesson:', err);
    }
  };

  const handleQuizComplete = async (quizResult) => {
    if (quizResult.passed) {
      await handleLessonComplete();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading lesson content...</div>
      </div>
    );
  }

  if (error || !currentLesson || !course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">{error || 'Lesson not found'}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{course?.title}</h1>
        <h2 className="text-2xl mb-4">
          Lesson {parseInt(lessonIndex) + 1}: {currentLesson?.title}
        </h2>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Навигация по урокам */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate(`/courses/${courseId}/lessons/${parseInt(lessonIndex) - 1}`)}
            disabled={parseInt(lessonIndex) === 0}
            className={`px-4 py-2 rounded ${
              parseInt(lessonIndex) === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous Lesson
          </button>
          <button
            onClick={() => navigate(`/courses/${courseId}/lessons/${parseInt(lessonIndex) + 1}`)}
            disabled={parseInt(lessonIndex) === course.lessons.length - 1}
            className={`px-4 py-2 rounded ${
              parseInt(lessonIndex) === course.lessons.length - 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next Lesson
          </button>
        </div>

        {/* Видео */}
        {currentLesson?.videoUrl && (
          <div className="mb-8">
            <VideoPlayer
              videoUrl={currentLesson.videoUrl}
              lessonId={currentLesson._id}
              onComplete={handleLessonComplete}
            />
          </div>
        )}

        {/* Контент урока */}
        {currentLesson?.content && (
          <div className="prose max-w-none mb-8">
            {currentLesson.content}
          </div>
        )}

        {/* Квиз */}
        {currentLesson?.quiz && (
          <div className="mt-8">
            <Quiz
              quiz={currentLesson.quiz}
              lessonId={currentLesson._id}
              onComplete={handleQuizComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonView;