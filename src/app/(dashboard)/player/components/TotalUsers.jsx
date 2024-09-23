"use client";
import React, { useState, useEffect } from "react";
import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";

export default function TotalUsers() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [userSignups, setUserSignups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get the authentication token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  // Fetch users data from the API
  const fetchUsersData = async () => {
    const authToken = getAuthToken();
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    try {
      const response = await fetch("http://localhost:8800/api/auth/users", {
        headers: headers,
      });
      if (!response.ok) throw new Error("Failed to fetch users data");
      const usersData = await response.json();

      // Set the total number of users
      setTotalUsers(usersData.length);

      // Create a zig-zag motion by alternating values
      const processedData = usersData.map((user, index) => ({
        index,
        value: index % 2 === 0 ? 3 + index * 2 : 2 + index * 3, // Adjust this logic for more variation
      }));

      setUserSignups(processedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Total Users</h2>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-green-600">{totalUsers}</span>
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </span>
      </div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={userSignups}>
            <YAxis hide={true} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.3}
              strokeWidth={2} // Make the line smooth and thicker
              dot={false} // No dots on the graph
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
