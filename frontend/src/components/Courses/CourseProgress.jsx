import React from 'react';

const CourseProgress = ({ progress, totalLessons, course }) => {
  // Подсчитываем завершенные уроки на основе пройденных квизов
  const calculateCompletedLessons = () => {
    if (!course || !course.lessons) return 0;
    
    let completed = 0;
    course.lessons.forEach(lesson => {
      if (lesson.quiz && lesson.quiz.attempts) {
        // Проверяем, есть ли успешная попытка (score >= 70%)
        const hasPassedQuiz = lesson.quiz.attempts.some(attempt => 
          attempt.userId.toString() === localStorage.getItem('userId') && 
          attempt.score >= 70
        );
        if (hasPassedQuiz) {
          completed++;
        }
      }
    });
    return completed;
  };

  const completedLessons = calculateCompletedLessons();
  const percentComplete = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium">Course Progress</span>
        <span>{percentComplete}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${percentComplete}%` }}
        ></div>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {completedLessons} of {totalLessons} lessons completed
      </div>
    </div>
  );
};

export default CourseProgress;