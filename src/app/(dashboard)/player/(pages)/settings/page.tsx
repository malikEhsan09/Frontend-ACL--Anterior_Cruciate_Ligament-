"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa"; // Import check icon for alert
import Modal from "react-modal"; // Modal for editing the profile details
import { useRouter } from "next/navigation"; // Import the router to redirect if necessary

// Set default styles for Modal overlay and content
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "500px", // Adjust the width for better visibility
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    maxHeight: "80vh", // Limit the modal height to 80% of viewport height
    overflowY: "auto", // Enable scrolling inside modal if content overflows
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)", // Dark background overlay
  },
};

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    dateOfBirth: "",
    address: "",
    gender: "",
    nationality: "",
    phoneNumber: "",
    image: null,
    isMember: "",
    club: null, // Adding club information
  });

  const router = useRouter(); // Router for potential redirects

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = localStorage.getItem("userId")?.trim(); // Trim whitespace
      const authToken = localStorage.getItem("authToken");

      if (!userId || !authToken) {
        console.error("User ID or Auth token is missing.");
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${authToken}`);

      try {
        const response = await fetch(
          `http://localhost:8800/api/player/${userId}`,
          {
            method: "GET",
            headers: myHeaders,
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("Fetched Profile Data:", result);

          setProfileInfo({
            firstName: result.firstName || "",
            lastName: result.lastName || "",
            age: result.age || "",
            dateOfBirth: result.dateOfBirth
              ? new Date(result.dateOfBirth).toISOString().split("T")[0]
              : "",
            address: result.address || "",
            gender: result.gender || "",
            nationality: result.nationality || "",
            phoneNumber: result.phoneNumber || "",
            image: result.image || null,
            isMember: result.isMember || "Enrolled",
            club: result.club || null, // Assign club or null if not available
          });
        } else {
          console.error("Failed to fetch profile data", response.status);
        }
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({ ...profileInfo, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    setProfileInfo({ ...profileInfo, image: e.target.files[0] });
  };

  // Toggle the editing state and open the modal
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle modal close
  const closeModal = () => {
    setIsEditing(false);
  };

  // Function to handle form submission
  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");

    if (!userId || !authToken) {
      console.error("User ID or Auth token is missing.");
      router.push("/login");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    const formdata = new FormData();
    formdata.append("firstName", profileInfo.firstName);
    formdata.append("lastName", profileInfo.lastName);
    formdata.append("age", profileInfo.age);
    formdata.append("dateOfBirth", profileInfo.dateOfBirth);
    formdata.append("address", profileInfo.address);
    formdata.append("gender", profileInfo.gender);
    formdata.append("nationality", profileInfo.nationality);
    formdata.append("phoneNumber", profileInfo.phoneNumber);

    // Append image if it exists
    if (profileInfo.image) {
      formdata.append("image", profileInfo.image);
    }

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: formdata,
    };

    try {
      const response = await fetch(
        `http://localhost:8800/api/player/${userId}`,
        requestOptions
      );

      if (response.ok) {
        setAlertMessage("Your Profile has been updated successfully");
        setSuccess(true);
        setOpen(true);
        setIsEditing(false);

        setTimeout(() => {
          setOpen(false);
        }, 3000);

        // Optionally, refetch the updated data here
        fetchProfileData();
      } else {
        setAlertMessage("Failed to update profile. Please try again.");
        setSuccess(false);
        setOpen(true);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
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

      {/* Profile Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div className="w-2 h-8 bg-orange-500 rounded-full mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">Profile</h2>
          </div>
          <div className="flex items-center">
            <Image
              src={
                profileInfo?.image ||
                "http://res.cloudinary.com/dr5p2iear/image/upload/v1726809890/mri_files/hosrtxzyj5p4nfvgieqv.jpg"
              }
              alt="Profile"
              width={64}
              height={64}
              className="w-16 h-16 rounded-full mr-4 object-cover"
            />

            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {profileInfo.firstName} {profileInfo.lastName}
              </h3>
              <p className="text-gray-600">{profileInfo.email}</p>
            </div>
          </div>
        </div>
        <button
          className="bg-buttonColor hover:bg-onHover text-white px-4 py-2 rounded-lg"
          onClick={handleEditToggle}
        >
          Edit Profile
        </button>
      </div>

      {/* Horizontal Rule */}
      <hr className="border-t-2 border-gray-200 my-6" />

      {/* Personal Information Section */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
          <h2 className="text-xl font-bold text-gray-800">
            Personal Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">First Name</p>
            <p className="text-gray-800">{profileInfo.firstName}</p>
          </div>
          <div>
            <p className="text-gray-600">Last Name</p>
            <p className="text-gray-800">{profileInfo.lastName}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone Number</p>
            <p className="text-gray-800">{profileInfo.phoneNumber}</p>
          </div>
          <div>
            <p className="text-gray-600">Date of Birth</p>
            <p className="text-gray-800">{profileInfo.dateOfBirth}</p>
          </div>
          <div>
            <p className="text-gray-600">Age</p>
            <p className="text-gray-800">{profileInfo.age} years</p>
          </div>
          <div>
            <p className="text-gray-600">Gender</p>
            <p className="text-gray-800">{profileInfo.gender}</p>
          </div>
        </div>
      </div>

      {/* Horizontal Rule */}
      <hr className="border-t-2 border-gray-200 my-6" />

      {/* Address Section */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="w-2 h-8 bg-purple-500 rounded-full mr-3"></div>
          <h2 className="text-xl font-bold text-gray-800">Address</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Country</p>
            <p className="text-gray-800">{profileInfo.nationality}</p>
          </div>
          <div>
            <p className="text-gray-600">City/State</p>
            <p className="text-gray-800">{profileInfo.address}</p>
          </div>
        </div>
      </div>

      {/* Horizontal Rule */}
      <hr className="border-t-2 border-gray-200 my-6" />

      {/* Club Section */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="w-2 h-8 bg-green-500 rounded-full mr-3"></div>
          <h2 className="text-xl font-bold text-gray-800">Club</h2>
        </div>
        <div>
          {profileInfo.club ? (
            <p className="text-gray-800">{profileInfo.club.name}</p>
          ) : (
            <p className="text-gray-800">Player not assigned to a club yet.</p>
          )}
        </div>
      </div>

      {/* Horizontal Rule */}
      <hr className="border-t-2 border-gray-200 my-6" />

      {/* Modal for Editing */}
      <Modal
        isOpen={isEditing}
        onRequestClose={closeModal}
        contentLabel="Edit Profile Modal"
        style={customStyles} // Custom styles for modal
      >
        <div className="modal-content">
          {/* Centered Heading */}
          <h3 className="text-xl font-bold mb-4 text-center">
            Edit Profile Information
          </h3>

          {/* Input fields with labels */}
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={profileInfo.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full mb-4"
          />

          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profileInfo.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full mb-4"
          />

          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={profileInfo.phoneNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full mb-4"
          />

          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={profileInfo.dateOfBirth}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full mb-4"
          />

          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={profileInfo.address}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full mb-4"
          />

          <label className="block text-gray-700">Gender</label>
          <input
            type="text"
            name="gender"
            value={profileInfo.gender}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full mb-4"
          />

          <label className="block text-gray-700">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={profileInfo.nationality}
            onChange={handleChange}
            className="border border-gray-300 rounded px-2 py-1 w-full mb-4"
          />

          {/* Image Upload */}
          <label className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
            className="border border-gray-300 rounded px-2 py-1 w-full mb-4"
          />

          {/* Save and Cancel Buttons Centered */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
            >
              Save Changes
            </button>
            <button
              onClick={closeModal}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
