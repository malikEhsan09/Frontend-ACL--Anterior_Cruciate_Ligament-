import React from "react";

export default function Banner() {
  return (
    <section className="relative my-12 bg-gradient-to-r from-[#12182A] to-[#4E73A9] text-white py-20 px-8 rounded-3xl max-w-7xl mx-auto">
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
        <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition duration-300">
          Request Demo
        </button>
      </div>

      {/* Optional Background Pattern or Wave */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-[url('/mnt/data/image.png')] bg-no-repeat bg-bottom"></div>
    </section>
  );
}
