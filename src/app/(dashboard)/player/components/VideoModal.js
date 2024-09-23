import React, { useRef, useState, useEffect } from "react";
import { X } from "lucide-react"; // Assuming you're using lucide-react for the close icon
import { Play, Pause } from "lucide-react"; // Import Play and Pause icons from lucide-react

const VideoModal = ({ thumbnailSrc, videoSrc, title, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [showThumbnail, setShowThumbnail] = useState(true); // Controls when to hide thumbnail

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", updateTime);
      videoRef.current.addEventListener("loadedmetadata", setDurationTime);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", updateTime);
        videoRef.current.removeEventListener("loadedmetadata", setDurationTime);
      }
    };
  }, []);

  const updateTime = () => {
    const current = formatTime(videoRef.current.currentTime);
    setCurrentTime(current);
  };

  const setDurationTime = () => {
    const durationTime = formatTime(videoRef.current.duration);
    setDuration(durationTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      setShowThumbnail(false); // Hide thumbnail when playing
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      <div className="relative w-full max-w-5xl p-4">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Thumbnail and video toggle */}
        {showThumbnail ? (
          <div className="relative">
            <img
              className="w-full h-auto rounded-lg"
              src={thumbnailSrc}
              alt={title}
            />

            <div className="absolute bottom-0 left-0 w-[35rem] ml-[20rem] mb-[3rem] bg-gray-600 bg-opacity-50 rounded-full p-3 flex justify-between items-center text-white">
              <button onClick={handlePlayPause}>
                {isPlaying ? (
                  <Pause className="w-6 h-6" /> // Use Pause icon
                ) : (
                  <Play className="w-6 h-6" /> // Use Play icon
                )}
              </button>

              {/* Transparent Control Bar */}
              <div className="flex items-center space-x-2">
                <div className="text-sm">{currentTime}</div>
                <input
                  type="range"
                  className="w-48" // Reduced width
                  value={
                    (videoRef.current?.currentTime /
                      videoRef.current?.duration) *
                      100 || 0
                  }
                  onChange={(e) => {
                    const newTime =
                      (e.target.value * videoRef.current.duration) / 100;
                    videoRef.current.currentTime = newTime;
                  }}
                />
                <div className="text-sm">{duration}</div>
              </div>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            className="ml-[8rem] h-[31rem] rounded-3xl"
            controls
            autoPlay
          />
        )}
      </div>
    </div>
  );
};

export default VideoModal;
