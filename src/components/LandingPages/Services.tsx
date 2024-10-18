import React from "react";
import Image from "next/image";
import serviceIcon1 from "@/public/assets/Group 1000002157.svg";
import serviceIcon2 from "@/public/assets/Group 1000002158.svg";
import serviceIcon3 from "@/public/assets/Group 1000002159.svg";
import serviceIcon4 from "@/public/assets/Vector.svg";
import serviceIcon5 from "@/public/assets/Group.svg";

export default function HealthCareServices() {
  const services = [
    { name: "Strengthening", icon: serviceIcon1 },
    { name: "Flexibility", icon: serviceIcon2 },
    { name: "Technique", icon: serviceIcon3 },
    { name: "Support", icon: serviceIcon4 },
    { name: "Education", icon: serviceIcon5 },
  ];

  // Duplicate services array to create an infinite loop effect
  const scrollingServices = [...services, ...services];

  return (
    <div className="text-center py-16 bg-gray-100" id="services">
      <h2 className="text-3xl font-bold text-boldTextColor mb-4">
        Health Care Services
      </h2>
      <p className="text-lg text-gray-600 mb-12">
        Explore our range of health care services designed to provide
        comprehensive care and support for your well-being.
      </p>
      <div className="relative overflow-hidden">
        <div className="flex gap-8 animate-scroll">
          {scrollingServices.map((service, index) => (
            <div
              key={index}
              className="bg-gray-200 p-6 rounded-lg flex flex-col items-center space-y-4 transform transition-transform duration-300 hover:scale-110 hover:bg-gray-300 shadow-lg hover:shadow-2xl hover:rounded-xl"
            >
              <Image
                src={service.icon}
                alt={service.name}
                className="w-16 h-16 transition-transform duration-300"
              />
              <span className="text-lg font-semibold text-gray-800">
                {service.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
