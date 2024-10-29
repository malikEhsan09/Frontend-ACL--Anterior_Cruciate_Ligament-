import React, { useRef, useState, useEffect, useCallback } from "react";
import { X, Play, Pause } from "lucide-react";
import Image from 'next/image';

interface VideoModalProps {
  thumbnailSrc: string;
  videoSrc: string;
  title: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ thumbnailSrc, videoSrc, title, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<string>("00:00");
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [showThumbnail, setShowThumbnail] = useState<boolean>(true);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const updateTime = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(formatTime(videoRef.current.currentTime));
    }
  }, []);

  const setDurationTime = useCallback(() => {
    if (videoRef.current) {
      setDuration(formatTime(videoRef.current.duration));
    }
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("timeupdate", updateTime);
      videoElement.addEventListener("loadedmetadata", setDurationTime);
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", updateTime);
        videoElement.removeEventListener("loadedmetadata", setDurationTime);
      }
    };
  }, [setDurationTime, updateTime]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        setShowThumbnail(false);
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (Number(e.target.value) * videoRef.current.duration) / 100;
      videoRef.current.currentTime = newTime;
      updateTime();
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      <div className="relative w-full max-w-5xl p-4">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close video modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Thumbnail and video toggle */}
        {showThumbnail ? (
          <div className="relative">
            <Image
              src={thumbnailSrc}
              alt={`${title} Thumbnail`}
              width={640}
              height={360}
              className="rounded-lg"
            />
            <div className="absolute bottom-0 left-0 w-[35rem] ml-[20rem] mb-[3rem] bg-gray-600 bg-opacity-50 rounded-full p-3 flex justify-between items-center text-white">
              <button onClick={handlePlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <div className="flex items-center space-x-2">
                <div className="text-sm">{currentTime}</div>
                <input
                  type="range"
                  className="w-48"
                  value={
                    videoRef.current && videoRef.current.duration
                      ? (videoRef.current.currentTime / videoRef.current.duration) * 100
                      : 0
                  }
                  onChange={handleSeek}
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
