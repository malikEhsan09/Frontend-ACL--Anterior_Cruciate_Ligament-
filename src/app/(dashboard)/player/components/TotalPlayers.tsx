"use client";
import React, { useState, useEffect } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

// Dummy chart data for example
const chartData = [
  { value: 100 },
  { value: 200 },
  { value: 150 },
  { value: 300 },
  { value: 250 },
  { value: 400 },
];

export default function TotalPlayers() {
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to get the authentication token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  // Fetch players data from the API
  useEffect(() => {
    const fetchPlayersData = async () => {
      const authToken = getAuthToken();
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${authToken}`);

      try {
        const response = await fetch("http://localhost:8800/api/player", {
          method: "GET",
          headers: headers,
        });

        if (!response.ok) throw new Error("Failed to fetch players data");

        const playersData = await response.json();
        setTotalPlayers(playersData.length);
      } catch (error) {
        console.error("Error:", (error as Error).message);
        if (error instanceof Error) {
          setError(error.message); // Display error to the user
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlayersData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Total Players Reg</h2>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-green-600">
          {totalPlayers}
        </span>
        <span className="text-green-600 text-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
      </div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
