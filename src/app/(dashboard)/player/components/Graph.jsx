"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format } from "date-fns";

// Custom legend with rounded dots
const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="flex space-x-4 justify-center mb-4">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center space-x-2">
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span style={{ color: entry.color }}>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

// Helper function to generate an array with all days of the week
const generateWeekDays = () => {
  return [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
};

// Function to abbreviate week day names
const abbreviateDay = (day) => {
  const abbreviations = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };
  return abbreviations[day] || day;
};

const ClubsOverview = () => {
  const [data, setData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [clubCount, setClubCount] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get the authentication token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  // Fetch clubs data
  const fetchClubsData = async () => {
    const authToken = getAuthToken();
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    try {
      const response = await fetch("http://localhost:8800/api/club", {
        headers: headers,
      });
      if (!response.ok) throw new Error("Failed to fetch clubs data");
      const clubsData = await response.json();

      // Prepare a map to hold the number of active and inactive clubs for each day
      const weekDays = generateWeekDays();
      const dayMap = weekDays.reduce((acc, day) => {
        acc[day] = { activeClubs: 0, inactiveClubs: 0 };
        return acc;
      }, {});

      // Populate the map with the data from the fetched clubs
      clubsData.forEach((club) => {
        const clubCreatedDate = new Date(club.createdAt);
        const clubDay = format(clubCreatedDate, "EEEE"); // Get full day of the week (Monday, Tuesday, etc.)
        if (club.isActive) {
          dayMap[clubDay].activeClubs += 1;
        } else {
          dayMap[clubDay].inactiveClubs += 1;
        }
      });

      // Convert the dayMap to an array suitable for the chart
      const processedData = Object.keys(dayMap).map((day) => ({
        name: day,
        activeClubs: dayMap[day].activeClubs,
        inactiveClubs: dayMap[day].inactiveClubs,
      }));

      setData(processedData);
      setClubCount(clubsData.length);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch players count
  const fetchPlayersCount = async () => {
    const authToken = getAuthToken();
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    try {
      const response = await fetch("http://localhost:8800/api/player", {
        headers: headers,
      });
      if (!response.ok) throw new Error("Failed to fetch players data");
      const playersData = await response.json();
      setPlayerCount(playersData.length); // Assuming playersData is an array of player objects
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all users count
  const fetchUsersCount = async () => {
    const authToken = getAuthToken();
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    try {
      const response = await fetch("http://localhost:8800/api/auth/users", {
        headers: headers,
      });
      if (!response.ok) throw new Error("Failed to fetch users data");
      const usersData = await response.json();
      setUserCount(usersData.length); // Assuming usersData is an array of user objects
    } catch (error) {
      console.error(error);
    }
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setLoading(true);

    // Fetch data based on selected filter
    fetchClubsData();
    fetchPlayersCount();
    fetchUsersCount();
  };

  useEffect(() => {
    handleFilterChange(activeFilter); // Fetch initial data on mount
  }, []);

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#1f2937",
            padding: "10px",
            borderRadius: "8px",
            color: "#fff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p className="label" style={{ fontWeight: "bold" }}>
            {`Clubs Overview`}
          </p>
          <p
            style={{ color: "#10B981" }}
          >{`Active Clubs: ${payload[0].value}`}</p>
          <p
            style={{ color: "#547ea8" }}
          >{`Inactive Clubs: ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      {/* Title and Filter Buttons */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Clubs Overview</h2>
        <div className="flex space-x-2">
          {["Week", "Month", "Year", "All"].map((filter) => (
            <button
              key={filter}
              className={`${
                activeFilter === filter ? "bg-buttonColor" : "bg-gray-300"
              } text-white px-3 py-1 rounded`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Indicator Buttons for Active and Inactive Clubs */}
      <div className="flex space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-green-500 rounded-full"></div>
          <p className="text-sm text-gray-700">Active Clubs</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-lightBlue rounded-full"></div>
          <p className="text-sm text-gray-700">Inactive Clubs</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickFormatter={abbreviateDay} // Format the day names to abbreviations
            />
            <YAxis axisLine={false} tickLine={false} allowDecimals={false} />{" "}
            {/* Only whole numbers on Y-axis */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
            />
            <Legend content={renderLegend} /> {/* Custom Legend */}
            {/* Bars for active and inactive clubs */}
            <Bar
              dataKey="activeClubs"
              fill="#10B981"
              minPointSize={5}
              radius={[10, 10, 0, 0]}
              barSize={50}
            />
            <Bar
              dataKey="inactiveClubs"
              radius={[10, 10, 0, 0]}
              fill="#547ea8"
              minPointSize={5}
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats with Dynamic Data */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-2xl font-bold text-onHover">{clubCount}</p>
          <p className="text-sm text-gray-600">Total Clubs</p>
        </div>
        <div>
          {/* Calculate active clubs based on fetched data */}
          <p className="text-2xl font-bold text-onHover">
            {data[0]?.activeClubs || 0}
          </p>
          <p className="text-sm text-gray-600">Active Clubs</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-onHover">{playerCount}</p>
          <p className="text-sm text-gray-600">Total Players</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-onHover">{userCount}</p>
          <p className="text-sm text-gray-600">Total Users</p>
        </div>
      </div>
    </div>
  );
};

export default ClubsOverview;
