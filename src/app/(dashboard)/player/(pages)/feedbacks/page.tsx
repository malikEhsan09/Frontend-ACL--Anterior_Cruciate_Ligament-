"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

// Dummy data for 5 reviews
const reviews = [
  {
    name: "Leo",
    title: "Lead Designer",
    content:
      "It was a very good experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas.",
    rating: 4,
  },
  {
    name: "Sarah",
    title: "Project Manager",
    content:
      "Excellent service and communication. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in viverra.",
    rating: 5,
  },
  {
    name: "Mike",
    title: "Developer",
    content:
      "Great team to work with. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas.",
    rating: 4,
  },
  {
    name: "Emily",
    title: "Software Engineer",
    content:
      "Absolutely loved working with this team. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    rating: 5,
  },
  {
    name: "David",
    title: "CEO",
    content:
      "Fantastic experience from start to finish. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas.",
    rating: 5,
  },
];

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "What",
    },
    {
      text: "Our",
    },
    {
      text: "Client",
    },
    {
      text: "Say",
    },
    {
      text: "About",
    },
    {
      text: "Us.",
      className: "text-lightBlue dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <TypewriterEffect words={words} />
    </div>
  );
}

const words = [
  {
    text: "What",
  },
  {
    text: "Our",
  },
  {
    text: "Client",
  },
  {
    text: "Say",
  },
  {
    text: "About",
  },
  {
    text: "Us.",
    className: "text-lightBlue dark:text-blue-500",
  },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next card
  const nextReview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent any default action
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  // Function to go to the previous card
  const prevReview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent any default action
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  // Handle dot click to directly go to a specific review
  const handleDotClick = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault(); // Prevent any default action
    setCurrentIndex(index);
  };

  const handleRateUsClick = () => {
    toast.success("Thank you for rating us!");
  };

  // Get the positions of the three visible cards
  const getVisibleCards = () => {
    const prev = (currentIndex - 1 + reviews.length) % reviews.length;
    const center = currentIndex;
    const next = (currentIndex + 1) % reviews.length;

    return [prev, center, next];
  };

  const visibleCards = getVisibleCards();

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mt-3">
        <h2 className="text-2xl font-semibold text-darkslategray">
          {/* <TypewriterEffectDemo /> */}
          <TypewriterEffect words={words} />
        </h2>
      </div>

      <div className="mt-8 flex justify-center items-center relative">
        {/* Previous arrow */}
        <button
          onClick={prevReview}
          className="p-2 border border-gray-300 rounded-lg absolute left-0"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        {/* Cards */}
        <div className="flex items-center space-x-4">
          {visibleCards.map((index, idx) => {
            const isCenter = idx === 1; // The center card is the second one
            return (
              <div
                key={index}
                className={`transition-all duration-300 ease-in-out p-4 border shadow-md rounded-lg ${
                  isCenter
                    ? "transform scale-105 z-10"
                    : "transform scale-90 opacity-80"
                } flex-shrink-0`}
                style={{
                  width: isCenter ? "300px" : "260px", // Slightly smaller than before
                  height: isCenter ? "360px" : "320px", // Slightly reduced height
                }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src="https://i.pravatar.cc/100"
                    alt={`${reviews[index].name}'s avatar`}
                    className="w-14 h-14 rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">
                      {reviews[index].name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {reviews[index].title}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold">
                  {reviews[index].content.split(".")[0]}
                </p>
                <p className="text-sm text-gray-600">
                  {reviews[index].content}
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

        {/* Next arrow */}
        <button
          onClick={nextReview}
          className="p-2 border border-gray-300 rounded-lg absolute right-0"
          aria-label="Next review"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Carousel indicators (dots) */}
      <div className="mt-4 flex justify-center space-x-2">
        {reviews.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === currentIndex ? "bg-gray-800" : "bg-gray-300"
            }`}
            onClick={(e) => handleDotClick(i, e)} // Set current index on dot click
          />
        ))}
      </div>

      {/* Rate Us Button */}
      <div className="mt-6 flex justify-center">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold"
          onClick={handleRateUsClick}
        >
          Rate Us Here
        </button>
      </div>
    </div>
  );
}
