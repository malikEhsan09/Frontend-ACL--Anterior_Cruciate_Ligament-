"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  Edit,
  Plus,
  Calendar,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import styles from "./appointment.module.css";

interface Schedule {
  _id: string;
  day: string;
  timings: string[];
}

interface Toast {
  id: number;
  title: string;
  description: string;
  type: "success" | "error" | "info";
}

export default function DoctorSchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [selectedDay, setSelectedDay] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const dataPerPage = 7;

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await fetch(`http://localhost:8800/api/doctor/schedule`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store the token in localStorage
        },
      });
      if (!response.ok) throw new Error("Failed to fetch schedules");
      const data = await response.json();
      setSchedules(data.schedule.slots);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      addToast("Error", "Failed to fetch schedules", "error");
    }
  };

  const currentData = schedules.slice(
    (currentPage - 1) * dataPerPage,
    currentPage * dataPerPage
  );

  const totalPages = Math.ceil(schedules.length / dataPerPage);

  const addToast = (
    title: string,
    description: string,
    type: "success" | "error" | "info"
  ) => {
    const id = Date.now();
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, title, description, type },
    ]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, ""]);
  };

  const handleTimeSlotChange = (index: number, value: string) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index] = value;
    setTimeSlots(newTimeSlots);
  };

  // * Create Schedule
  const handleCreateSchedule = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Doctor schedule Token:", token);
      
      const response = await fetch("http://localhost:8800/api/doctor/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          slots: [
            {
              day: selectedDay,
              timings: timeSlots.filter((slot) => slot !== ""),
            },
          ],
        }),
      });

      if (!response.ok) throw new Error("Failed to create schedule");

      const data = await response.json();
      setSchedules((prevSchedules) => [
        ...prevSchedules,
        ...data.schedule.slots,
      ]);
      setIsModalOpen(false);
      setSelectedDay("");
      setTimeSlots([]);
      addToast(
        "Schedule Created",
        `New schedule for ${selectedDay} has been created successfully.`,
        "success"
      );
    } catch (error) {
      console.error("Error creating schedule:", error);
      addToast("Error", "Failed to create schedule", "error");
    }
  };

  const handleViewSchedule = (schedule: Schedule) => {
    addToast("View Schedule", `Viewing schedule for ${schedule.day}`, "info");
  };

  const handleEditSchedule = (schedule: Schedule) => {
  
    // Implement edit functionality
    addToast("Edit Schedule", `Editing schedule for ${schedule.day}`, "info");
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    try {
      const response = await fetch(`/api/schedule/${scheduleId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete schedule");

      setSchedules(schedules.filter((schedule) => schedule._id !== scheduleId));
      addToast(
        "Schedule Deleted",
        "The selected schedule has been deleted successfully.",
        "success"
      );
    } catch (error) {
      console.error("Error deleting schedule:", error);
      addToast("Error", "Failed to delete schedule", "error");
    }
  };

  return (
    <div className="p-2 mt-2">
      {/* Toast Container */}
      <div className={styles.toastContainer}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${styles.toast} ${
              toast.type === "success"
                ? styles.success
                : toast.type === "error"
                ? styles.error
                : styles.info
            }`}
          >
            <h4 className={styles.toastTitle}>{toast.title}</h4>
            <p>{toast.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-start mb-3 bg-[#F0F0F0] p-2 rounded-t-2xl">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-3 h-8 bg-[#152f86b2] rounded-md mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              Schedule Management
            </h2>
          </div>
          <Button
            className="text-md font-semibold px-2 p-1 rounded-md text-white bg-[#4681BC] mt-1 ml-3 hover:bg-[#3A6FA4] hover:cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Create Schedule
          </Button>
        </div>
        <div className="flex items-center">
          <label className="text-sm font-medium text-gray-600 mr-2">
            Sort by:
          </label>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-32 bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Newest">Newest</SelectItem>
              <SelectItem value="Oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left font-medium text-gray-500">
                  ID
                </th>
                <th className="py-3 px-6 text-left font-medium text-gray-500">
                  Day
                </th>
                <th className="py-3 px-6 text-left font-medium text-gray-500">
                  Time Slots
                </th>
                <th className="py-3 px-6 text-left font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentData.map((schedule, index) => (
                <tr key={schedule._id} className="border-t">
                  <td className="py-3 px-6 text-blue-600 font-bold">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6">
                    <Badge
                      variant="outline"
                      className="bg-white text-gray-700 border-gray-300"
                    >
                      {schedule.day}
                    </Badge>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex flex-wrap gap-2">
                      {schedule.timings.map((time, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-gray-100 text-gray-700"
                        >
                          {time}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex space-x-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewSchedule(schedule)}
                            >
                              <Eye className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Schedule</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditSchedule(schedule)}
                            >
                              <Edit className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Schedule</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteSchedule(schedule._id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Schedule</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600 items-center ml-2">
          Showing {currentPage * dataPerPage - dataPerPage + 1} to{" "}
          {Math.min(currentPage * dataPerPage, schedules.length)} of{" "}
          {schedules.length} entries
        </p>
        <div className="flex space-x-2 items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
              className={
                currentPage === i + 1 ? "bg-[#4681BC] text-white" : "bg-white"
              }
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Create Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create Schedule</CardTitle>
              <CardDescription>
                Set your availability for appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Day</label>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger className="bg-white">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Slots</label>
                {timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <Input
                      type="time"
                      value={slot}
                      onChange={(e) =>
                        handleTimeSlotChange(index, e.target.value)
                      }
                      className="flex-grow bg-white"
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddTimeSlot}
                  className="w-full bg-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Time Slot
                </Button>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateSchedule}
                  className="bg-[#4681BC] text-white hover:bg-[#3A6FA4]"
                >
                  Create Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
