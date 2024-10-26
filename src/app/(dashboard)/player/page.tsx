"use client";
import TotalClubs from "./components/TotalClubs";
import TotalPlayers from "./components/TotalPlayers";
import TotalUsers from "./components/TotalUsers";
import UserVisits from "./components/UsersVisit";
import Graph from "./components/Graph.jsx";
import RecentActivities from "./components/RecenetActivities.jsx";

export default function Player() {
  return (
    <div className="bg-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <TotalClubs />
        <TotalPlayers />
        <TotalUsers />
        <UserVisits />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Graph />
        </div>
        <div>
          <RecentActivities />
        </div>
      </div>
    </div>
  );
}
