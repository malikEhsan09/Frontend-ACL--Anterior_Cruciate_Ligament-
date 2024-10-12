// "use client";

// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartLegend,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import {
//   Area,
//   AreaChart,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";

// const data = [
//   { month: "Jan", patients: 65 },
//   { month: "Feb", patients: 85 },
//   { month: "Mar", patients: 45 },
//   { month: "Apr", patients: 55 },
//   { month: "May", patients: 75 },
//   { month: "Jun", patients: 70 },
// ];

// const Doctor = () => {
//   return (
//     <div className="p-6 bg-gray-900 text-white min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Welcome to Doctor Dashboard</h1>

//       <Card className="mb-8 bg-gray-800 border-gray-700">
//         <CardHeader>
//           <CardTitle className="text-white">
//             Patient Visits over Last 6 Months
//           </CardTitle>
//           <CardDescription className="text-gray-400">
//             Monthly breakdown of patient visits
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ChartContainer
//             config={{
//               patients: {
//                 label: "Patients",
//                 color: "hsl(143, 100%, 30%)",
//               },
//             }}
//             className="h-[300px]"
//           >
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={data}>
//                 <defs>
//                   <linearGradient
//                     id="colorPatients"
//                     x1="0"
//                     y1="0"
//                     x2="0"
//                     y2="1"
//                   >
//                     <stop
//                       offset="5%"
//                       stopColor="hsl(143, 100%, 30%)"
//                       stopOpacity={0.8}
//                     />
//                     <stop
//                       offset="95%"
//                       stopColor="hsl(143, 100%, 30%)"
//                       stopOpacity={0}
//                     />
//                   </linearGradient>
//                 </defs>
//                 <XAxis dataKey="month" stroke="#888888" />
//                 <YAxis stroke="#888888" />
//                 <ChartTooltip content={<CustomTooltip />} />
//                 <Area
//                   type="monotone"
//                   dataKey="patients"
//                   stroke="hsl(143, 100%, 30%)"
//                   fillOpacity={1}
//                   fill="url(#colorPatients)"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//         </CardContent>
//       </Card>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <StatCard
//           title="Partially Injured"
//           value="45"
//           change="+6% from yesterday"
//           bgColor="bg-red-900"
//           textColor="text-red-100"
//         />
//         <StatCard
//           title="ACL Tear"
//           value="16"
//           change="+8% from yesterday"
//           bgColor="bg-yellow-900"
//           textColor="text-yellow-100"
//         />
//         <StatCard
//           title="Healthy"
//           value="29"
//           change="+3% from yesterday"
//           bgColor="bg-green-900"
//           textColor="text-green-100"
//         />
//         <StatCard
//           title="Total MRI's"
//           value="16"
//           change="+6% from yesterday"
//           bgColor="bg-purple-900"
//           textColor="text-purple-100"
//         />
//       </div>

//       <Card className="bg-gray-800 border-gray-700">
//         <CardHeader>
//           <CardTitle className="text-white">Appointments</CardTitle>
//           <div className="flex justify-between items-center">
//             <CardDescription className="text-gray-400">
//               Available slots
//             </CardDescription>
//             <select className="bg-gray-700 text-white border-gray-600 rounded p-2">
//               <option>Newest</option>
//               <option>Oldest</option>
//             </select>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <table className="w-full text-gray-300">
//             <thead>
//               <tr className="border-b border-gray-700">
//                 <th className="text-left p-2">Doctor</th>
//                 <th className="text-left p-2">Slot</th>
//                 <th className="text-left p-2">Date</th>
//                 <th className="text-left p-2"></th>
//               </tr>
//             </thead>
//             <tbody>
//               <AppointmentRow
//                 doctor="Ehsan Ahmad"
//                 slot="8:30 - 9:30"
//                 date="21/04/2024"
//               />
//               <AppointmentRow
//                 doctor="John Doe"
//                 slot="7:30 - 8:30"
//                 date="21/04/2024"
//               />
//               <AppointmentRow
//                 doctor="Jane Doe"
//                 slot="8:30 - 9:30"
//                 date="21/04/2024"
//               />
//             </tbody>
//           </table>
//           <div className="flex justify-center mt-4">
//             <Pagination />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-gray-800 border border-gray-700 p-2 rounded">
//         <p className="text-white">{`${label} : ${payload[0].value} patients`}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const StatCard = ({ title, value, change, bgColor, textColor }) => (
//   <Card className={`${bgColor} ${textColor}`}>
//     <CardHeader>
//       <CardTitle>{title}</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <p className="text-3xl font-bold">{value}</p>
//       <p className="text-sm">{change}</p>
//     </CardContent>
//   </Card>
// );

// const AppointmentRow = ({ doctor, slot, date }) => (
//   <tr className="border-b border-gray-700">
//     <td className="p-2">{doctor}</td>
//     <td className="p-2">{slot}</td>
//     <td className="p-2">{date}</td>
//     <td className="p-2">
//       <button className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded">
//         Book
//       </button>
//     </td>
//   </tr>
// );

// const Pagination = () => (
//   <div className="flex items-center space-x-2">
//     <button className="border border-gray-600 text-gray-300 rounded px-3 py-1 hover:bg-gray-700">
//       &lt;
//     </button>
//     <button className="border border-gray-600 bg-blue-600 text-white rounded px-3 py-1">
//       1
//     </button>
//     <button className="border border-gray-600 text-gray-300 rounded px-3 py-1 hover:bg-gray-700">
//       2
//     </button>
//     <button className="border border-gray-600 text-gray-300 rounded px-3 py-1 hover:bg-gray-700">
//       ...
//     </button>
//     <button className="border border-gray-600 text-gray-300 rounded px-3 py-1 hover:bg-gray-700">
//       9
//     </button>
//     <button className="border border-gray-600 text-gray-300 rounded px-3 py-1 hover:bg-gray-700">
//       10
//     </button>
//     <button className="border border-gray-600 text-gray-300 rounded px-3 py-1 hover:bg-gray-700">
//       &gt;
//     </button>
//   </div>
// );

// export default Doctor;

"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", patients: 65 },
  { month: "Feb", patients: 85 },
  { month: "Mar", patients: 45 },
  { month: "Apr", patients: 55 },
  { month: "May", patients: 75 },
  { month: "Jun", patients: 70 },
  { month: "Jul", patients: 90 },
  { month: "Aug", patients: 95 },
  { month: "Sep", patients: 65 },
  { month: "Oct", patients: 70 },
  { month: "Nov", patients: 60 },
  { month: "Dec", patients: 75 },
];

const Doctor = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome to Doctor Dashboard
      </h1> */}

      <Card className="mb-8 shadow-lg">
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl text-gray-800">
            Patient Visits over Last 12 Months
          </CardTitle>
          <CardDescription className="text-gray-600">
            Monthly breakdown of patient visits
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorPatients"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(143, 100%, 30%)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(143, 100%, 30%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis stroke="#888888" axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="patients"
                  stroke="hsl(143, 100%, 30%)"
                  fillOpacity={1}
                  fill="url(#colorPatients)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Partially Injured"
          value="45"
          change="+6% from yesterday"
          bgColor="bg-red-100"
          textColor="text-red-800"
        />
        <StatCard
          title="ACL Tear"
          value="16"
          change="+8% from yesterday"
          bgColor="bg-yellow-100"
          textColor="text-yellow-800"
        />
        <StatCard
          title="Healthy"
          value="29"
          change="+3% from yesterday"
          bgColor="bg-green-100"
          textColor="text-green-800"
        />
        <StatCard
          title="Total MRI's"
          value="16"
          change="+6% from yesterday"
          bgColor="bg-purple-100"
          textColor="text-purple-800"
        />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800">Appointments</CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription className="text-gray-600">
              Available slots
            </CardDescription>
            <select className="bg-white text-gray-800 border border-gray-300 rounded p-2 shadow-sm">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <table className="w-full text-gray-800">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-2">Doctor</th>
                <th className="text-left p-2">Slot</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AppointmentRow
                doctor="Ehsan Ahmad"
                slot="8:30 - 9:30"
                date="21/04/2024"
              />
              <AppointmentRow
                doctor="John Doe"
                slot="7:30 - 8:30"
                date="21/04/2024"
              />
              <AppointmentRow
                doctor="Jane Doe"
                slot="8:30 - 9:30"
                date="21/04/2024"
              />
            </tbody>
          </table>
          <div className="flex justify-center mt-6">
            <Pagination />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 p-3 rounded shadow-md">
        <p className="text-gray-800 font-semibold">{`${label} : ${payload[0].value} patients`}</p>
      </div>
    );
  }
  return null;
};

const StatCard = ({ title, value, change, bgColor, textColor }) => (
  <Card
    className={`${bgColor} ${textColor} shadow-lg transition-all duration-300 hover:shadow-xl`}
  >
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm mt-2">{change}</p>
    </CardContent>
  </Card>
);

const AppointmentRow = ({ doctor, slot, date }) => (
  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
    <td className="p-3">{doctor}</td>
    <td className="p-3">{slot}</td>
    <td className="p-3">{date}</td>
    <td className="p-3">
      <button className="  border-green-700 bg-green-100 text-green-500 px-5 py-1 rounded-lg hover:bg-green-200 transition-colors duration-200">
        Book
      </button>
    </td>
  </tr>
);

const Pagination = () => (
  <div className="flex items-center space-x-2">
    <button className="border border-gray-300 text-gray-600 rounded px-3 py-1 hover:bg-gray-100 transition-colors duration-200">
      &lt;
    </button>
    <button className="border border-gray-300 bg-blue-500 text-white rounded px-3 py-1">
      1
    </button>
    <button className="border border-gray-300 text-gray-600 rounded px-3 py-1 hover:bg-gray-100 transition-colors duration-200">
      2
    </button>
    <button className="border border-gray-300 text-gray-600 rounded px-3 py-1 hover:bg-gray-100 transition-colors duration-200">
      ...
    </button>
    <button className="border border-gray-300 text-gray-600 rounded px-3 py-1 hover:bg-gray-100 transition-colors duration-200">
      9
    </button>
    <button className="border border-gray-300 text-gray-600 rounded px-3 py-1 hover:bg-gray-100 transition-colors duration-200">
      10
    </button>
    <button className="border border-gray-300 text-gray-600 rounded px-3 py-1 hover:bg-gray-100 transition-colors duration-200">
      &gt;
    </button>
  </div>
);

export default Doctor;
