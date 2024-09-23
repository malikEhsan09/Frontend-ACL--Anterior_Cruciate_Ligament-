"use client";
import React, { useState, useEffect } from "react";
import ExerciseCard from "../../components/ExerciseCard";
import VideoModal from "../../components/VideoModal"; // Import the VideoModal component
import { Loader } from "lucide-react"; // Import Loader icon from lucide-react
import { CheckCircle } from "lucide-react"; // Import CheckCircle icon

const Exercises = () => {
  const [exerciseData, setExerciseData] = useState([]); // Store exercise data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [progress, setProgress] = useState(0); // Progress percentage
  const [noMoreVideos, setNoMoreVideos] = useState(false); // Track if more videos are left to load
  const [selectedVideo, setSelectedVideo] = useState(null); // Track currently selected video for the modal

  // Function to fetch exercise data from backend API
  useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);

      // Get token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found in localStorage");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8800/api/exercise", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the header
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error(
            "Failed to fetch exercises. Status:",
            response.status,
            "Response:",
            errorMessage
          );
          throw new Error(`Failed to fetch exercises: ${response.statusText}`);
        }

        const exercises = await response.json();
        console.log("Exercises fetched successfully:", exercises);

        // Map response data to the expected structure
        const formattedExercises = exercises.flatMap((exercise) => {
          const videos = [
            ...exercise.partiallyDamages.map((v) => ({
              title: `${exercise.title} - Partially Damaged`,
              videoSrc: v.videoUrl,
              thumbnailSrc: v.thumbnailUrl, // Use the thumbnail URL
              category: "Partially Damaged",
              duration: null, // Duration will be set dynamically
            })),
            ...exercise.completelyRuptured.map((v) => ({
              title: `${exercise.title} - ACL Tear`,
              videoSrc: v.videoUrl,
              thumbnailSrc: v.thumbnailUrl, // Use the thumbnail URL
              category: "ACL Tear",
              duration: null, // Duration will be set dynamically
            })),
            ...exercise.tutorials.map((v) => ({
              title: `${exercise.title} - Tutorial`,
              videoSrc: v.videoUrl,
              thumbnailSrc: v.thumbnailUrl, // Use the thumbnail URL
              category: "Tutorial",
              duration: null, // Duration will be set dynamically
            })),
          ];

          return videos.map((video) => ({
            ...video,
            isCompleted: false, // Initial completion flag
          }));
        });

        setExerciseData(formattedExercises);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, []); // Fetch data on mount

  // Calculate the progress based on completed exercises
  useEffect(() => {
    const completedExercises = exerciseData.filter(
      (exercise) => exercise.isCompleted
    ).length;
    const totalExercises = exerciseData.length;
    const percentage = (completedExercises / totalExercises) * 100;
    setProgress(percentage.toFixed(0)); // Round to the nearest whole number
  }, [exerciseData]);

  const loadMoreExercises = () => {
    setIsLoading(true);

    // Simulating fetching new exercises
    setTimeout(() => {
      const newExercises = []; // Simulate more exercises

      if (newExercises.length === 0) {
        setNoMoreVideos(true); // No more videos to load
      } else {
        setExerciseData((prevData) => [...prevData, ...newExercises]);
      }

      setIsLoading(false);
    }, 1500); // Simulating a 1.5-second delay for fetching
  };

  // Handle card click to open the video in a modal
  const handleCardClick = (thumbnailSrc, videoSrc, title) => {
    setSelectedVideo({ thumbnailSrc, videoSrc, title });
  };

  // Handle completion of an exercise
  const handleCompleteExercise = (index) => {
    const updatedExercises = [...exerciseData];
    updatedExercises[index].isCompleted = !updatedExercises[index].isCompleted;
    setExerciseData(updatedExercises);
  };

  // Close the video modal
  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-3 h-8 bg-lightBlue rounded-full mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">Exercises</h2>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Progress {progress}%</p>
          <div className="w-40 bg-gray-300 rounded-full h-2 mt-1">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Grid setup for cards */}
      {exerciseData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {exerciseData.map((exercise, index) => (
            <div
              key={index}
              onClick={() =>
                handleCardClick(
                  exercise.thumbnailSrc,
                  exercise.videoSrc,
                  exercise.title
                )
              }
              className={`cursor-pointer border rounded-lg p-4 shadow-lg relative ${
                exercise.isCompleted ? "bg-light-green-500" : "bg-white"
              }`}
            >
              <ExerciseCard
                title={exercise.title}
                duration={exercise.duration ? exercise.duration : "Loading..."}
                progressStatus={
                  exercise.isCompleted ? "Completed" : "No Progress"
                }
                category={exercise.category}
              />
              <img
                src={exercise.thumbnailSrc}
                alt={exercise.title}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />

              <div
                onClick={(e) => {
                  e.stopPropagation(); // Prevent modal opening
                  handleCompleteExercise(index);
                }}
                className={`absolute top-2 right-2 p-2 rounded-full cursor-pointer ${
                  exercise.isCompleted ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                <CheckCircle
                  size={24}
                  color={exercise.isCompleted ? "white" : "black"}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No exercises available to display.</p>
        </div>
      )}

      {/* Load More button */}
      <div className="flex justify-center mt-6">
        {!noMoreVideos && exerciseData.length > 0 && (
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center"
            onClick={loadMoreExercises}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin mr-2 w-5 h-5" />
            ) : (
              <span className="material-icons mr-2">refresh</span>
            )}
            {isLoading ? "Loading..." : "Load more"}
          </button>
        )}

        {noMoreVideos && (
          <div className="text-center text-gray-600 py-4">
            No more videos to load.
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          thumbnailSrc={selectedVideo.thumbnailSrc}
          videoSrc={selectedVideo.videoSrc}
          title={selectedVideo.title}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Exercises;
