"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarIcon, User, X, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type TimeSlot = {
  time: string;
  day: string;
};

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  timeSlots: TimeSlot[];
};

export default function BookAppointment() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [appointmentType, setAppointmentType] = useState<"online" | "physical">("physical");

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Ehsan Ahmed",
      specialty: "Physiotherapist",
      rating: 4.9,
      image: "https://i.pravatar.cc/150?img=1",
      timeSlots: [
        { time: "9:00 am", day: "MON" },
        { time: "11:30 am", day: "TUE" },
        { time: "2:30 pm", day: "WED" }
      ]
    },
    {
      id: 2,
      name: "Dr. Sarah Wilson",
      specialty: "Physiotherapist",
      rating: 4.8,
      image: "https://i.pravatar.cc/150?img=2",
      timeSlots: [
        { time: "10:00 am", day: "TUE" },
        { time: "1:30 pm", day: "THU" },
        { time: "4:00 pm", day: "FRI" }
      ]
    },
    {
      id: 3,
      name: "Dr. Sarah Wilson",
      specialty: "Physiotherapist",
      rating: 4.8,
      image: "https://i.pravatar.cc/150?img=2",
      timeSlots: [
        { time: "10:00 am", day: "TUE" },
        { time: "1:30 pm", day: "THU" },
        { time: "4:00 pm", day: "FRI" }
      ]
    },
    {
      id: 4,
      name: "Dr. Sarah Wilson",
      specialty: "Physiotherapist",
      rating: 4.8,
      image: "https://i.pravatar.cc/150?img=2",
      timeSlots: [
        { time: "10:00 am", day: "TUE" },
        { time: "1:30 pm", day: "THU" },
        { time: "4:00 pm", day: "FRI" }
      ]
    },
    {
      id: 5,
      name: "Dr. Sarah Wilson",
      specialty: "Physiotherapist",
      rating: 4.8,
      image: "https://i.pravatar.cc/150?img=2",
      timeSlots: [
        { time: "10:00 am", day: "TUE" },
        { time: "1:30 pm", day: "THU" },
        { time: "4:00 pm", day: "FRI" }
      ]
    },
    // Add more doctors as needed
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

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-gray-200 rounded-lg" />
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      days.push(
        <div
          key={i}
          className="h-24 border border-gray-200 p-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50"
          onClick={() => {
            setSelectedDate(date);
            setIsModalOpen(true);
            setSelectedDoctor(null);
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

    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="h-24 border border-gray-200 bg-gray-50 rounded-lg">
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

  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedTimeSlot) {
      console.log("Booking appointment:", {
        doctor: selectedDoctor,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        type: appointmentType,
      });
      setIsModalOpen(false);
      setSelectedDoctor(null);
      setSelectedTimeSlot("");
      setAppointmentType("physical");
    }
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
        <DialogContent className="sm:max-w-[400px] rounded-lg p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="flex justify-between items-center text-base">
              {selectedDoctor ? "Book Appointment" : "Doctors Available"}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (selectedDoctor) {
                    setSelectedDoctor(null);
                  } else {
                    setIsModalOpen(false);
                  }
                }}
                className="h-6 w-6 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <hr className="mt-4 border-gray-200" />
          </DialogHeader>

          <div className="p-4 pt-0">
            {!selectedDoctor ? (
              <div className="space-y-3">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="flex items-center justify-between p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDoctorClick(doctor)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={doctor.image} alt={doctor.name} />
                        <AvatarFallback>
                          {doctor.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{doctor.name}</p>
                        <p className="text-xs text-gray-500">{doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm">{doctor.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedDoctor.image} alt={selectedDoctor.name} />
                    <AvatarFallback>
                      {selectedDoctor.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-base font-medium">{selectedDoctor.name}</h3>
                    <p className="text-sm text-gray-500">{selectedDoctor.specialty}</p>
                    <div className="flex items-center justify-center mt-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm">{selectedDoctor.rating}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Free Slots</h4>
                  <RadioGroup
                    value={selectedTimeSlot}
                    onValueChange={setSelectedTimeSlot}
                    className="space-y-2"
                  >
                    {selectedDoctor.timeSlots.map((slot) => (
                      <div
                        key={`${slot.day}-${slot.time}`}
                        className="flex items-center space-x-2 rounded-md border p-2"
                      >
                        <RadioGroupItem 
                          value={`${slot.day}-${slot.time}`} 
                          id={`${slot.day}-${slot.time}`}
                          className="h-3 w-3"
                        />
                        <Label 
                          htmlFor={`${slot.day}-${slot.time}`} 
                          className="text-sm cursor-pointer"
                        >
                          {slot.day}, {slot.time}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant={appointmentType === "online" ? "buttonColor" : "outline"}
                    onClick={() => setAppointmentType("online")}
                    className="flex-1 text-xs h-8"
                  >
                    Online
                  </Button>
                  <Button
                    variant={appointmentType === "physical" ? "buttonColor" : "outline"}
                    onClick={() => setAppointmentType("physical")}
                    className="flex-1 text-xs h-8"
                  >
                    Physical
                  </Button>
                </div>

                <Button
                  className="w-full text-xs h-8 bg-buttonColor hover:bg-onHover/900"
                  disabled={!selectedTimeSlot}
                  onClick={handleBookAppointment}
                >
                  Book Appointment
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

