import React from "react";

export default function Banner() {
  return (
    <section className="relative my-12 bg-gradient-to-r from-[#12182A] to-[#4E73A9] text-white py-20 px-8 rounded-3xl w-full mx-auto">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-4">
          Precision ACL Detection for Enhanced Recovery and Performance
        </h1>

        {/* Subheading */}
        <p className="text-lg mb-8">
          Precision ACL Detection for Enhanced Recovery. Utilize our
          state-of-the-art web application to swiftly identify anterior cruciate
          ligament (ACL) injuries with unparalleled accuracy.
        </p>

        {/* Call to Action Button */}
        <div className="flex justify-center ">
          <button className="bg-white text-[#1E293B] hover:bg-opacity-90 transition-colors duration-300 font-semibold py-2 px-4 rounded-full text-sm flex items-center hover:cursor-pointer">
            <svg
              className="w-8 h-9 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            Request Demo
          </button>
        </div>
      </div>

      {/* Optional Background Pattern or Wave */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-[url('/mnt/data/image.png')] bg-no-repeat bg-bottom"></div>
    </section>
  );
}
