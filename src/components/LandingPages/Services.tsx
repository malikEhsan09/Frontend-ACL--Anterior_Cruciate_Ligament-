import Image from "next/image";
import serviceIcon1 from "@/public/assets/Group 1000002157.svg";
import serviceIcon2 from "@/public/assets/Group 1000002158.svg";
import serviceIcon3 from "@/public/assets/Group 1000002159.svg";
import serviceIcon4 from "@/public/assets/Vector.svg";
import serviceIcon5 from "@/public/assets/Group.svg";
import AnimateOnScroll from "@/components/LandingPages/AnimateOnScroll.tsx"; // Import Animation

export default function HealthCareServices() {
  const services = [
    { name: "Strengthening", icon: serviceIcon1 },
    { name: "Flexibility", icon: serviceIcon2 },
    { name: "Technique", icon: serviceIcon3 },
    { name: "Support", icon: serviceIcon4 },
    { name: "Education", icon: serviceIcon5 },
  ];

  return (
    <div className="text-center py-16 bg-gray-100" id="services">
      <h2 className="text-3xl font-bold text-boldTextColor mb-4">
        Health Care Services
      </h2>
      <p className="text-lg text-gray-600 mb-12">
        Explore our range of health care services designed to provide
        comprehensive care and support for your well-being.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-200 p-6 rounded-lg flex flex-col items-center space-y-4 transform transition-all duration-300 hover:scale-105"
          >
            <Image
              src={service.icon}
              alt={service.name}
              className="w-12 h-12"
            />
            <span className="text-lg font-semibold text-gray-800">
              {service.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
