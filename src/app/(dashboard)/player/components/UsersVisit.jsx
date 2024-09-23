"use client";
import React, { useState, useEffect } from "react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

// Mock data service to simulate API response
const fetchMockUserVisits = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = [
        { date: "2024-09-20", visits: Math.floor(Math.random() * 3000) },
        { date: "2024-09-21", visits: Math.floor(Math.random() * 3000) },
        { date: "2024-09-22", visits: Math.floor(Math.random() * 3000) },
        { date: "2024-09-23", visits: Math.floor(Math.random() * 3000) },
        { date: "2024-09-24", visits: Math.floor(Math.random() * 3000) },
        { date: "2024-09-25", visits: Math.floor(Math.random() * 3000) },
      ];
      resolve(mockData);
    }, 1000); // Simulate a 1-second API delay
  });
};

export default function UserVisits() {
  const [userVisitsData, setUserVisitsData] = useState([]); // Data for BarChart
  const [totalVisits, setTotalVisits] = useState(0); // Total visits count
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to simulate fetching user visit data
  const fetchUserVisits = async () => {
    try {
      const data = await fetchMockUserVisits();
      setUserVisitsData(data);
      // Calculate total visits
      const total = data.reduce((sum, entry) => sum + entry.visits, 0);
      setTotalVisits(total);
    } catch (err) {
      setError("Failed to fetch user visits data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the user visits data when the component mounts
  useEffect(() => {
    fetchUserVisits();
  }, []);

  // Conditional rendering if loading or error occurs
  if (loading) return <div>Loading user visits...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">User Visits</h2>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-green-600">{totalVisits}</span>
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </span>
      </div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={userVisitsData}>
            <Bar
              dataKey="visits"
              stroke="#10B981"
              fill="#10B981"
              type="monotone"
              fillOpacity={0.5}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// *Another static card which show the activness

// "use client";
// import { LineChart, Line, ResponsiveContainer } from "recharts";
// import React, { useState, useEffect } from "react";

// // Mock service to simulate fetching active session data
// const fetchMockActiveSessions = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const mockData = [
//         { session: 1, value: 5 },
//         { session: 2, value: 10 },
//         { session: 3, value: 8 },
//         { session: 4, value: 15 },
//         { session: 5, value: 12 },
//       ];
//       resolve(mockData);
//     }, 1000);
//   });
// };

// export default function ActiveSessions() {
//   const [activeSessionsData, setActiveSessionsData] = useState([]);
//   const [totalSessions, setTotalSessions] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Simulate fetching active sessions
//   const fetchActiveSessions = async () => {
//     try {
//       const data = await fetchMockActiveSessions();
//       setActiveSessionsData(data);
//       // Calculate total active sessions
//       const total = data.reduce((sum, entry) => sum + entry.value, 0);
//       setTotalSessions(total);
//     } catch (err) {
//       setError("Failed to fetch active sessions data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchActiveSessions();
//   }, []);

//   if (loading) return <div>Loading active sessions...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="bg-gray-100 p-4 rounded-lg">
//       <h2 className="text-lg font-semibold mb-2">Active Sessions</h2>
//       <div className="flex items-center justify-between">
//         <span className="text-2xl font-bold text-green-600">
//           {totalSessions}
//         </span>
//         {/* New attractive icon */}
//         <span className="text-green-600 text-3xl">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             className="h-8 w-8"
//             fill="currentColor"
//           >
//             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 14h-2v-4H8v-2h6V8h2v8z" />
//           </svg>
//         </span>
//       </div>
//       <div className="h-16">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={activeSessionsData}>
//             <Line
//               type="monotone"
//               dataKey="value"
//               stroke="#10B981"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }
