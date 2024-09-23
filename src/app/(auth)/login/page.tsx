"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import football from "@/public/assets/football.svg";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa"; // Importing check icon for alert

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false); // For custom alert
  const [success, setSuccess] = useState(false); // For determining alert type
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:8800/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log("Login response data: ", data); // Check the response data

      if (response.ok) {
        console.log("Storing user data in localStorage:", data.user._id);

        // Store the userId, userName, email, and token in localStorage
        localStorage.setItem("userId", data.user._id.trim()); // FIX: Use _id instead of id
        localStorage.setItem("userName", data.user.userName);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("authToken", data.token);

        setAlertMessage("Login successful! Redirecting...");
        setSuccess(true);
        setOpen(true);

        // Redirect user based on userType
        const userType = data.user.userType;
        const isAdmin = data.user.isAdmin;

        setTimeout(() => {
          setOpen(false);
          if (userType === "Player") {
            router.push("/player/"); // Redirect to Player dashboard
          } else if (userType === "Admin" && isAdmin) {
            router.push("/admin"); // Redirect to Admin dashboard
          } else if (userType === "Doctor") {
            router.push("/doctor"); // Redirect to Doctor dashboard
          }
        }, 2000);
      } else {
        console.error("Login failed:", data.message);
        setAlertMessage(data.message || "Login failed. Please try again.");
        setSuccess(false);
        setOpen(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setAlertMessage("An error occurred. Please try again.");
      setSuccess(false);
      setOpen(true);
    }
  };

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen font-poppins bg-gray-100">
      {/* Left side with image and text */}
      <div className="lg:w-1/2 bg-blue-100 relative hidden lg:flex items-center justify-center">
        <Image
          src={football}
          priority
          alt="Football Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 shadow-2xl"
        />
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-10 text-white z-10">
          <h2 className="text-4xl font-semibold mb-4">
            Let's empower your financial task today with Findash.
          </h2>
          <p className="text-lg">
            The one-stop platform for all financial management of small and
            medium-sized businesses.
          </p>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-md bg-gray-200 p-8 rounded-xl shadow-xl relative">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Login to Your Account
          </h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4 relative">
              <label className="block text-2xl text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <div className="relative flex items-center">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 pointer-events-none">
                  <MdEmail className="w-6 h-6" />
                </span>
                <input
                  type="email"
                  placeholder="youname@gmail.com"
                  className="w-full text-[18px] pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-200 text-lg"
                  style={{ paddingLeft: "3rem" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 pointer-events-none">
                  <RiLockPasswordFill className="w-6 h-6" />
                </span>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full text-[18px] pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-200 text-lg"
                  style={{ paddingLeft: "3rem" }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <Link href="/forget-password" legacyBehavior>
                <a href="" className="text-blue-600 hover:underline text-sm">
                  Forgot Password?
                </a>
              </Link>
            </div>
            <button className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 font-semibold text-[16px] transition duration-200 shadow-md text-lg hover:cursor-pointer">
              Login
            </button>
          </form>
          <div className="flex items-center justify-center my-4">
            <span className="text-gray-500">or</span>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link href={"/signup"} className="text-blue-600 hover:underline">
              Register Here
            </Link>
          </p>
        </div>
      </div>

      {/* Custom Alert at the top */}
      {open && (
        <div className="fixed top-0 left-0 right-0 bg-white border border-gray-200 shadow-lg p-4 text-center mx-auto max-w-xl z-50 animate-slide-down rounded-lg">
          {success ? (
            <>
              <FaCheckCircle className="w-8 h-8 text-green-500 inline-block mr-2" />
              <span className="text-lg font-semibold text-green-600">
                {alertMessage}
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold text-red-600">
              {alertMessage}
            </span>
          )}
        </div>
      )}

      {/* Slide-in animation */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
