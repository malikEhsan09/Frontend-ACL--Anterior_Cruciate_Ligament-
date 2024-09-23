"use client";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Github,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/public/assets/logo.svg";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "Software Training",
    gender: "Male",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch("http://localhost:8800/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Your message has been sent successfully!");
        setFormData({
          name: "",
          email: "",
          query: "Software Training",
          gender: "Male",
          message: "",
        }); // Clearing the fornm
      } else {
        setResponseMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      setResponseMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);

      // Clear the response message after 3 seconds
      setTimeout(() => {
        setResponseMessage("");
      }, 3000);
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row w-full h-full bg-white"
      id="contact"
    >
      <div className="bg-[#1D3A7C] flex-1 p-10 rounded-bl-[100px] rounded-tr-[50px] flex items-center justify-center text-white shadow-lg">
        <div className="w-full max-w-lg">
          <h2 className="text-4xl font-bold mb-8 text-left">Reach Out to Us</h2>
          <p className="mb-8 text-left text-gray-300">
            Contact us if you need support for your next event
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 text-white">
                  Your Name
                </label>
                <input
                  id="name"
                  className="p-2 rounded-md bg-[#4E73A9] text-white border-none focus:ring-2 focus:ring-white"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 text-white">
                  Email Address
                </label>
                <input
                  id="email"
                  className="p-2 rounded-md bg-[#4E73A9] text-white border-none focus:ring-2 focus:ring-white"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="query" className="mb-1 text-white">
                  Query About
                </label>
                <select
                  id="query"
                  className="p-2 rounded-md bg-[#4E73A9] text-white border-none focus:ring-2 focus:ring-white"
                  value={formData.query}
                  onChange={handleChange}
                >
                  <option>Software Training</option>
                  <option>Consultation</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="gender" className="mb-1 text-white">
                  Gender
                </label>
                <select
                  id="gender"
                  className="p-2 rounded-md bg-[#4E73A9] text-white border-none focus:ring-2 focus:ring-white"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="mb-1 text-white">
                Message
              </label>
              <textarea
                id="message"
                className="p-2 rounded-md bg-[#4E73A9] text-white border-none focus:ring-2 focus:ring-white"
                placeholder="Let us know your thoughts"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-[#12182A] px-6 py-3 rounded text-white font-bold hover:bg-[#333] transition duration-300"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit Request"}
              </button>
            </div>
          </form>
          {responseMessage && (
            <div
              className={`mt-4 text-center ${
                responseMessage.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {responseMessage}
            </div>
          )}
        </div>
      </div>

      {/* Right Side: Contact Info */}
      <div className="bg-white flex-1 p-10 text-black rounded-tr-[100px] rounded-bl-[50px] flex items-center justify-center shadow-lg">
        <div className="w-full max-w-lg">
          <div className="flex items-center justify-center mb-8">
            <Image
              src={logo}
              alt="ACL Tear Detector"
              width={60}
              height={60}
              className="w-16 h-16"
            />
            <h3 className="text-3xl font-bold ml-4">ACL Tear Detector</h3>
          </div>
          <div className="space-y-6 text-center">
            <div className="flex justify-center items-center">
              <Phone className="inline-block mr-2" />
              <span>+92 343 8749361</span>
            </div>
            <div className="flex justify-center items-center">
              <Mail className="inline-block mr-2" />
              <span>Detection@gmail.com</span>
            </div>
            <div className="flex justify-center items-center">
              <MapPin className="inline-block mr-2" />
              <span>2A, Comsats University, Islamabad</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8">
            <div className="flex justify-center space-x-4 mb-4">
              <Facebook className="w-6 h-6 text-gray-700 hover:text-black cursor-pointer" />
              <Twitter className="w-6 h-6 text-gray-700 hover:text-black cursor-pointer" />
              <Instagram className="w-6 h-6 text-gray-700 hover:text-black cursor-pointer" />
              <Github className="w-6 h-6 text-gray-700 hover:text-black cursor-pointer" />
              <Linkedin className="w-6 h-6 text-gray-700 hover:text-black cursor-pointer" />
            </div>
            <p className="text-gray-500 text-center">
              Follow us on social media
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
