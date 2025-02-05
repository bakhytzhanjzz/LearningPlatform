import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

const VideoPlayer = ({ videoUrl, lessonId, onComplete }) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const isYoutubeVideo = videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be');

  useEffect(() => {
    const loadProgress = async () => {
      try {
        // Исправляем URL эндпоинта
        const response = await axios.get(`http://localhost:5000/api/courses/lessons/${lessonId}/video-progress`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.data.lastPosition) {
          if (!isYoutubeVideo && videoRef.current) {
            videoRef.current.currentTime = response.data.lastPosition;
          }
        }
        setProgress(response.data.progress || 0);
        setLoading(false);
      } catch (err) {
        console.error('Error loading progress:', err);
        setLoading(false);
      }
    };

    if (lessonId) {
      loadProgress();
    } else {
      setLoading(false);
    }
  }, [lessonId, isYoutubeVideo]);

  const saveProgress = async (currentTime) => {
    try {
      await axios.post(
        `http://localhost:5000/api/courses/lessons/${lessonId}/video-progress`,
        {
          watchedDuration: currentTime,
          lastPosition: currentTime,
          completed: false
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="aspect-w-16 aspect-h-9">
        {isYoutubeVideo ? (
          <iframe
            src={videoUrl}
            className="w-full h-[500px]"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            ref={videoRef}
            controls
            className="w-full"
            onTimeUpdate={(e) => saveProgress(e.target.currentTime)}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;