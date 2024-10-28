"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Calendar as CalendarIcon,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  image: string;
};

export default function BookAppointment() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Mock & static data for the doctor we can change this
  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Ehsan Ahmed",
      specialty: "Physiotherapist",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Dr. Ehsan Ahmed",
      specialty: "Physiotherapist",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Dr. Ehsan Ahmed",
      specialty: "Physiotherapist",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Dr. Ehsan Ahmed",
      specialty: "Physiotherapist",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Dr. Ehsan Ahmed",
      specialty: "Physiotherapist",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-24 border border-gray-200 rounded-lg"
        ></div>
      );
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );

      days.push(
        <div
          key={i}
          className="h-24 border border-gray-200 p-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
          onClick={() => {
            setSelectedDate(date);
            setIsModalOpen(true);
          }}
        >
          <div className="flex justify-between items-start">
            <span className="text-sm font-semibold">{i}</span>
            <div className="flex space-x-1">
              <CalendarIcon className="h-4 w-4 text-gray-400" />
              <User className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="mt-2 text-xs text-blue-600">Book Appointment</div>
        </div>
      );
    }

    // Add empty cells for days after the last day of the month
    const totalCells = 42; // 6 rows * 7 days
    const remainingCells = totalCells - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="h-24 border border-gray-200 bg-gray-50 rounded-lg"
        >
          <span className="text-sm text-gray-400">{i + 1}</span>
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center font-semibold py-2 border-b border-gray-200"
          >
            {day}
          </div>
        ))}
        {generateCalendarDays()}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Doctors Available
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedDate && (
              <p className="mb-4 font-semibold">
                Selected Date:{" "}
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback>
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{doctor.name}</p>
                    <p className="text-sm text-gray-500">{doctor.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{doctor.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
