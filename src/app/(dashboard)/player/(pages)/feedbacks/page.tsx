"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

const words = [
  { text: "What" },
  { text: "Our" },
  { text: "Client" },
  { text: "Say" },
  { text: "About" },
  { text: "Us.", className: "text-lightBlue dark:text-blue-500" },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0); // Start from the first valid review
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Missing auth token. Please log in.");
      }

      const response = await fetch("http://localhost:8800/api/feedback/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch feedbacks. Status: ${response.status}`
        );
      }

      const feedbackData = await response.json();

      // Filter valid reviews to ensure there are no empty or invalid ones
      const validReviews = feedbackData.filter(
        (review: any) => review.username && review.description
      );

      if (validReviews.length > 0) {
        setReviews(validReviews); // Store only valid reviews
      } else {
        setReviews([]); // In case there are no valid reviews, ensure empty state
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSubmitRating = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      username: (e.target as HTMLFormElement).username.value,
      email: (e.target as HTMLFormElement).email.value,
      title: (
        (e.target as HTMLFormElement).elements.namedItem(
          "title"
        ) as HTMLInputElement
      ).value,
      description: (e.target as HTMLFormElement).description.value,
      rating: rating,
      sentiment:
        rating >= 4 ? "Positive" : rating === 3 ? "Neutral" : "Negative",
    };

    try {
      const response = await fetch("http://localhost:8800/api/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success("Thank you for your rating!");
        fetchFeedbacks();
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      } else {
        const errorResponse = await response.json();
        toast.error("Failed to submit feedback.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting feedback.");
    }
  };

  const handleRateUsClick = () => {
    setShowModal(true);
  };

  const getThreeVisibleCards = () => {
    const start = (currentIndex - 1 + reviews.length) % reviews.length;
    const center = currentIndex;
    const end = (currentIndex + 1) % reviews.length;

    return [start, center, end];
  };

  const visibleCards = getThreeVisibleCards();

  if (reviews.length === 0) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-2xl font-semibold text-darkslategray">
          No reviews available
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mt-3">
        <h2 className="text-xl font-semibold text-darkBlue">
          <TypewriterEffect words={words} />
        </h2>
      </div>

      <div className="mt-8 flex justify-center items-center relative">
        {reviews.length > 1 && (
          <button
            onClick={prevReview}
            className="p-2 border border-gray-300 rounded-lg absolute left-0"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
        )}

        <div className="flex justify-center space-x-4">
          {visibleCards.map((index, idx) => {
            const isCenter = idx === 1; // Only the second card should be the center
            return (
              <div
                key={index}
                className={`transition-all duration-300 ease-in-out p-4 border shadow-md rounded-lg ${
                  isCenter
                    ? "transform scale-105 z-10"
                    : "transform scale-90 opacity-80"
                } flex-shrink-0`}
                style={{
                  width: isCenter ? "300px" : "260px",
                  height: isCenter ? "360px" : "320px",
                  margin: "0 15px",
                }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.pravatar.cc/100"
                    alt={`${reviews[index].username}'s avatar`}
                    className="w-14 h-14 rounded-full"
                  />

                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">
                      {reviews[index].username}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {reviews[index].title || "No Title"}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold">
                  {reviews[index].description.split(".")[0]}
                </p>

                <p className="text-md font-semibold text-gray-600">
                  {reviews[index].description.split(".")[0]}
                </p>

                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < reviews[index].rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } fill-current`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {reviews.length > 1 && (
          <button
            onClick={nextReview}
            className="p-2 border border-gray-300 rounded-lg absolute right-0"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>

      {reviews.length > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          {reviews.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                i === currentIndex ? "bg-gray-800" : "bg-gray-300"
              }`}
              onClick={() => handleDotClick(i)}
            />
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          className="bg-buttonColor hover:bg-darkBlue cursor-text text-white px-4 py-2 rounded-lg font-semibold"
          onClick={handleRateUsClick}
        >
          Rate Us Here
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full m-4">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Submit your Rating
            </h2>
            <form onSubmit={handleSubmitRating}>
              {/* Form Fields */}
              <div className="mb-4 relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  placeholder="Username"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 ease-in-out peer placeholder-transparent"
                />
                <label
                  htmlFor="username"
                  className="absolute left-3 -top-2.5 text-gray-600 text-sm transition-all duration-200 ease-in-out bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Username
                </label>
              </div>
              <div className="mb-4 relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Email"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 ease-in-out peer placeholder-transparent"
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 -top-2.5 text-gray-600 text-sm transition-all duration-200 ease-in-out bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Email
                </label>
              </div>
              <div className="mb-4 relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="Title"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 ease-in-out peer placeholder-transparent"
                />
                <label
                  htmlFor="title"
                  className="absolute left-3 -top-2.5 text-gray-600 text-sm transition-all duration-200 ease-in-out bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Title
                </label>
              </div>
              <div className="mb-4 relative">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  required
                  placeholder="Description"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-200 ease-in-out peer placeholder-transparent"
                ></textarea>
                <label
                  htmlFor="description"
                  className="absolute left-3 -top-2.5 text-gray-600 text-sm transition-all duration-200 ease-in-out bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Description
                </label>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 cursor-pointer ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      } fill-current`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-buttonColor rounded-full hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightBlue"
                >
                  Submit Rating
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
