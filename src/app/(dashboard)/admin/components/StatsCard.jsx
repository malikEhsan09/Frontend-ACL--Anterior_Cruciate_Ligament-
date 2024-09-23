// src/components/StatsCard.jsx
"use client";
import React from "react";

const StatsCard = ({
  title,
  value,
  description,
  percentageChange,
  bgColor,
  icon,
}) => {
  return (
    <div className={`p-6 rounded-lg ${bgColor} text-white shadow-md flex-1`}>
      <div className="flex items-center justify-between">
        <div className="text-4xl font-bold">{value}</div>
        <div className="text-3xl">{icon}</div>
      </div>
      <div className="mt-4">
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-sm text-white mt-1">{description}</div>
      </div>
      <div className="mt-2 text-sm">{percentageChange}</div>
    </div>
  );
};

export default StatsCard;
