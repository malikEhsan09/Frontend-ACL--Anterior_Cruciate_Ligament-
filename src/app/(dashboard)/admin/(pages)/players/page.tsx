"use client";
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import axios from "axios";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaFlag,
  FaCheckCircle,
} from "react-icons/fa"; // Importing icons
import Image from "next/image";
// import "./style.css";

interface Player {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  gender: string;
  nationality: string;
  phoneNumber: string;
  image: string;
  isMember: string;
}

interface Club {
  _id: string;
  clubName: string;
  clubLocation: string;
  clubLogo: string;
  maxCapacity: number;
  players: string[];
  createdAt: string; // Add createdAt property
}

const ClubsWithPlayersAccordion: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("Newest");

  useEffect(() => {
    const fetchClubsAndPlayers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const [clubResponse, playerResponse] = await Promise.all([
          axios.get("http://localhost:8800/api/club", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:8800/api/player", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const fetchedClubs = clubResponse.data;
        const sortedData =
          sortOrder === "Newest"
            ? fetchedClubs.sort(
                (a: Club, b: Club) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
            : fetchedClubs.sort(
                (a: Club, b: Club) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              );

        setClubs(sortedData);
        setPlayers(playerResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchClubsAndPlayers();
  }, [sortOrder]);

  // Find player details by player ID
  const findPlayerById = (playerId: string): Player | undefined => {
    return players.find((player) => player._id === playerId);
  };

  if (isLoading) {
    return <div>Loading clubs and players...</div>;
  }

  return (
    <div className="p-2 mt-2">
      <div className="flex justify-between items-start mb-3 bg-[#F0F0F0] p-2 rounded-t-2xl">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-3 h-8 bg-[#152f86b2] rounded-md mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">Clubs</h2>
          </div>
        </div>
        <div className="flex items-center">
          <label className="text-sm font-medium text-gray-600 mr-2">
            Sort by:
          </label>
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-6 text-left font-medium text-gray-500">
              ID
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-500">
              Club Logo
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-500">
              Club Name
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-500">
              Location
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-500">
              Max Capacity
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-500">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {clubs.map((club, index) => (
            <React.Fragment key={club._id}>
              <tr className="border-t">
                <td className="py-3 px-6 text-blue-600 font-bold">
                  {index + 1}
                </td>
                <td className="py-3 px-6">
                  <Image
                    src={club.clubLogo}
                    alt="Club Logo"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </td>
                <td className="py-3 px-6">{club.clubName || "N/A"}</td>
                <td className="py-3 px-6">{club.clubLocation || "N/A"}</td>
                <td className="py-3 px-6">{club.maxCapacity || "N/A"}</td>
                <td className="py-3 px-6 text-center">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={`club-${club._id}`}>
                      <AccordionTrigger className="text-lightBlue hover:text-darkBlue hover:no-underline">
                        View Players
                      </AccordionTrigger>
                      <AccordionContent className="mt-4">
                        <div className="player-details-container">
                          {club.players && club.players.length > 0 ? (
                            <ul>
                              {club.players.map((playerId) => {
                                const player = findPlayerById(playerId);
                                return player ? (
                                  <li
                                    key={player._id}
                                    className="player-details mb-4"
                                  >
                                    <div className="player-info flex items-center">
                                      <Image
                                        src={player.image}
                                        alt={player.firstName}
                                        width={48} // Adjust width and height as needed
                                        height={48}
                                        className="player-image w-12 h-12 rounded-full mr-4"
                                      />
                                      <div>
                                        <h3 className="text-md font-semibold">
                                          {player.firstName} {player.lastName}
                                        </h3>
                                        <p className="text-sm flex items-center">
                                          <FaCalendarAlt className="mr-2" />{" "}
                                          {new Date(
                                            player.dateOfBirth
                                          ).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm flex items-center">
                                          <FaMapMarkerAlt className="mr-2" />
                                          {player.address}
                                        </p>
                                        <p className="text-sm flex items-center">
                                          <FaPhoneAlt className="mr-2" />
                                          {player.phoneNumber}
                                        </p>
                                        <p className="text-sm flex items-center">
                                          <FaUser className="mr-2" />
                                          {player.gender}
                                        </p>
                                        <p className="text-sm flex items-center">
                                          <FaFlag className="mr-2" />
                                          {player.nationality}
                                        </p>
                                        <p className="text-sm flex items-center">
                                          <FaCheckCircle className="mr-2" />
                                          {player.isMember}
                                        </p>
                                      </div>
                                    </div>
                                  </li>
                                ) : (
                                  <li
                                    key={playerId}
                                    className="text-sm text-gray-500"
                                  >
                                    Player information not found
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500">
                              No players assigned to this club
                            </p>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubsWithPlayersAccordion;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation"; // For navigation
// import axios from "axios";
// import {
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaUser,
//   FaFlag,
//   FaCheckCircle,
// } from "react-icons/fa"; // Importing icons
// import "./style.css";

// interface Player {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   address: string;
//   gender: string;
//   nationality: string;
//   phoneNumber: string;
//   image: string;
//   isMember: string;
// }

// interface Club {
//   _id: string;
//   clubName: string;
//   clubLocation: string;
//   clubLogo: string;
//   maxCapacity: number;
//   players: string[]; // Array of player IDs
// }

// const ClubsWithPlayersAccordion: React.FC = () => {
//   const [clubs, setClubs] = useState<Club[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [sortOrder, setSortOrder] = useState("Newest");
//   const router = useRouter(); // For navigation

//   useEffect(() => {
//     const fetchClubs = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         const clubResponse = await axios.get("http://localhost:8800/api/club", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const fetchedClubs = clubResponse.data;
//         const sortedData =
//           sortOrder === "Newest"
//             ? fetchedClubs.sort((a: Club, b: Club) =>
//                 new Date(b.createdAt).getTime() >
//                 new Date(a.createdAt).getTime()
//                   ? 1
//                   : -1
//               )
//             : fetchedClubs.sort((a: Club, b: Club) =>
//                 new Date(a.createdAt).getTime() >
//                 new Date(b.createdAt).getTime()
//                   ? 1
//                   : -1
//               );

//         setClubs(sortedData);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchClubs();
//   }, [sortOrder]);

//   if (isLoading) {
//     return <div>Loading clubs...</div>;
//   }

//   return (
//     <div className="p-2 mt-2">
//       <div className="flex justify-between items-start mb-3 bg-[#F0F0F0] p-2 rounded-t-2xl">
//         <div className="flex flex-col">
//           <div className="flex items-center mb-2">
//             <div className="w-3 h-8 bg-[#152f86b2] rounded-md mr-3"></div>
//             <h2 className="text-xl font-bold text-gray-800">Clubs</h2>
//           </div>
//         </div>
//         <div className="flex items-center">
//           <label className="text-sm font-medium text-gray-600 mr-2">
//             Sort by:
//           </label>
//           <select
//             className="p-2 border border-gray-300 rounded-md"
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//           >
//             <option value="Newest">Newest</option>
//             <option value="Oldest">Oldest</option>
//           </select>
//         </div>
//       </div>

//       <table className="min-w-full bg-white border border-gray-200 rounded-md">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="py-3 px-6 text-left font-medium text-gray-500">
//               ID
//             </th>
//             <th className="py-3 px-6 text-left font-medium text-gray-500">
//               Club Logo
//             </th>
//             <th className="py-3 px-6 text-left font-medium text-gray-500">
//               Club Name
//             </th>
//             <th className="py-3 px-6 text-left font-medium text-gray-500">
//               Location
//             </th>
//             <th className="py-3 px-6 text-left font-medium text-gray-500">
//               Max Capacity
//             </th>
//             <th className="py-3 px-6 text-left font-medium text-gray-500">
//               Action
//             </th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-700">
//           {clubs.map((club, index) => (
//             <tr key={club._id} className="border-t">
//               <td className="py-3 px-6 text-blue-600 font-bold">{index + 1}</td>
//               <td className="py-3 px-6">
//                 {club.clubLogo ? (
//                   <img
//                     src={club.clubLogo}
//                     alt="Club Logo"
//                     className="w-10 h-10 rounded-full"
//                   />
//                 ) : (
//                   "N/A"
//                 )}
//               </td>
//               <td className="py-3 px-6">{club.clubName || "N/A"}</td>
//               <td className="py-3 px-6">{club.clubLocation || "N/A"}</td>
//               <td className="py-3 px-6">{club.maxCapacity || "N/A"}</td>
//               <td className="py-3 px-6 text-center">
//                 {/* Navigate to dynamic route when View Players is clicked */}
//                 <button
//                   className="text-lightBlue hover:text-darkBlue"
//                   onClick={() =>
//                     router.push(
//                       `/players/${club._id}?players=${club.players.join(",")}`
//                     )
//                   }
//                 >
//                   View Players
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ClubsWithPlayersAccordion;
