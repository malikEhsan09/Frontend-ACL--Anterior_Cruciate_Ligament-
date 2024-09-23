import React from "react";
import { Clock } from "lucide-react"; // Import Clock icon from lucide-react

const ExerciseCard = ({ title, duration, progressStatus, category }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-200">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="text-sm text-gray-600 mb-1">{category}</div>
        <div className="flex items-center text-gray-500 mt-2">
          <Clock className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-sm">{duration} Min</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span
            className={`text-sm ${
              progressStatus === "Completed"
                ? "text-green-500"
                : "text-blue-500"
            }`}
          >
            {progressStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
