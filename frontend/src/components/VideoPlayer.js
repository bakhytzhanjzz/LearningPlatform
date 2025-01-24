const VideoPlayer = ({ videoUrl, onComplete }) => {
    const videoRef = useRef(null);
  
    const handleEnded = () => {
      if (onComplete) {
        onComplete();
      }
    };
  
    return (
      <div className="aspect-w-16 aspect-h-9">
        <video
          ref={videoRef}
          controls
          className="w-full"
          onEnded={handleEnded}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };