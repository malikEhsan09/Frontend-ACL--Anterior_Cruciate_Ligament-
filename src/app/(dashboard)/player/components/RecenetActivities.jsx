"use client";
import React, { useState, useEffect } from "react";

export default function RecentActivities() {
  // State to manage activities from the backend
  const [activities, setActivities] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [noMoreActivities, setNoMoreActivities] = useState(false);

  // Function to get the authentication token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  // Function to fetch club data from the API
  const fetchClubActivities = async () => {
    const authToken = getAuthToken();
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    try {
      const response = await fetch("http://localhost:8800/api/club", {
        headers: headers,
      });
      if (!response.ok) throw new Error("Failed to fetch club activities");
      const clubData = await response.json();
      console.log(clubData);

      // Map data to fit the activity format for display
      const clubActivities = clubData.map((club) => ({
        id: club._id,
        text: `${club?.clubName}`,
        date: club.createdAt, // Assuming 'createdAt' exists in your club schema
        logo: club?.clubLogo,
        type: "club",
      }));

      setActivities(clubActivities);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch club activities on component mount
  useEffect(() => {
    fetchClubActivities();
  }, []);

  // Function to toggle between showing 4 activities and all activities
  const handleToggleShow = () => {
    if (!showAll) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowAll(true);
        setNoMoreActivities(true); // Simulating that no more activities are available after viewing all
      }, 1500); // Simulate loading time
    } else {
      setShowAll(false);
      setNoMoreActivities(false); // Reset to show "Load more" again
    }
  };

  // Slice activities to show 4 initially or all if 'showAll' is true
  const displayedActivities = showAll ? activities : activities.slice(0, 4);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Recent Activities</h2>
      </div>

      {/* Recent Club Activities */}
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Clubs</h3>
      <ul className="space-y-2">
        {displayedActivities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              {/* Display club logo */}
              {activity.logo && (
                <img
                  src={activity.logo}
                  alt={`${activity.text}`}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div className="flex flex-col">
                {/* Club name bold */}
                <span className="text-gray-700 font-bold">{activity.text}</span>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(activity.date).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>

      {/* Load More / View Less button */}
      <div className="flex justify-center mt-6">
        {!noMoreActivities && activities.length > 0 && (
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center"
            onClick={handleToggleShow}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin mr-2 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              <span className="material-icons mr-2"></span>
            )}
            {isLoading ? "Loading..." : "View More"}
          </button>
        )}

        {noMoreActivities && (
          <div className="text-center text-gray-600 py-4">
            No more clubs to load.
          </div>
        )}
      </div>
    </div>
  );
}
