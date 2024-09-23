// "use client";
// import Graph from "./components/Graph";
// import RecentReports from "./components/RecentReports";
// import Mris from "./components/Mri's";
// import MriTableHeader from "./components/MriTableHeader";
// import { useState } from "react";

// // Updated Dummy Data
// const dummyData = [
//   {
//     id: "#AHGA68",
//     fileName: "Ehsan Ahmed MRI Report",
//     format: ".pdf",
//     date: "21/04/2024",
//     status: "Partial",
//   },
//   {
//     id: "#AHGA69",
//     fileName: "John Doe MRI Report",
//     format: ".pdf",
//     date: "15/03/2024",
//     status: "Complete",
//   },
//   {
//     id: "#AHGA70",
//     fileName: "Jane Smith MRI Report",
//     format: ".pdf",
//     date: "10/02/2024",
//     status: "Partial",
//   },
//   {
//     id: "#AHGA71",
//     fileName: "Mark Johnson MRI Report",
//     format: ".pdf",
//     date: "25/01/2024",
//     status: "Complete",
//   },
//   {
//     id: "#AHGA72",
//     fileName: "Emily Davis MRI Report",
//     format: ".pdf",
//     date: "18/01/2024",
//     status: "Complete",
//   },
//   {
//     id: "#AHGA73",
//     fileName: "Sarah Wilson MRI Report",
//     format: ".pdf",
//     date: "05/01/2024",
//     status: "Partial",
//   },
//   {
//     id: "#AHGA74",
//     fileName: "Michael Brown MRI Report",
//     format: ".pdf",
//     date: "28/12/2023",
//     status: "Complete",
//   },
//   {
//     id: "#AHGA75",
//     fileName: "Linda Taylor MRI Report",
//     format: ".pdf",
//     date: "20/12/2023",
//     status: "Partial",
//   },
//   {
//     id: "#AHGA76",
//     fileName: "James White MRI Report",
//     format: ".pdf",
//     date: "14/12/2023",
//     status: "Complete",
//   },
//   {
//     id: "#AHGA77",
//     fileName: "David Green MRI Report",
//     format: ".pdf",
//     date: "10/12/2023",
//     status: "Partial",
//   },
//   {
//     id: "#AHGA78",
//     fileName: "Haris Green MRI Report",
//     format: ".pdf",
//     date: "10/12/2023",
//     status: "Partial",
//   },
// ];

// const Player = () => {
//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 5; // Show 5 MRIs per page

//   // Calculate the number of pages
//   const totalPages = Math.ceil(dummyData.length / itemsPerPage);

//   // Get data for the current page
//   const currentData = dummyData.slice(
//     currentPage * itemsPerPage,
//     (currentPage + 1) * itemsPerPage
//   );

//   // Pagination handlers
//   const handleNextPage = () => {
//     if (currentPage < totalPages - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <>
//       <Graph />
//       {/* <section className="self-stretch flex flex-col items-start justify-start gap-[1.475rem] max-w-full text-left text-[0.875rem] text-darkslategray-300 font-xs-medium mt-12">
//         <RecentReports />
//         <MriTableHeader />
//         <Mris
//           data={currentData}
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onNextPage={handleNextPage}
//           onPreviousPage={handlePreviousPage}
//         />
//       </section> */}
//     </>
//   );
// };

// export default Player;

"use client";
import TotalClubs from "./components/TotalClubs";
import TotalPlayers from "./components/TotalPlayers";
import TotalUsers from "./components/TotalUsers";
import UserVisits from "./components/UsersVisit.jsx";
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
