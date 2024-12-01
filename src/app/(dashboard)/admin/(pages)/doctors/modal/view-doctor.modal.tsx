import Image from "next/image";

interface Doctor {
  profileImage?: string;
  name: string;
  speciality?: string;
  designation?: string;
  degree?: string;
  experience?: string;
  location?: string;
  viewCount?: number;
  rating?: number;
}

const ViewDoctorModal = ({ viewingDoctor, setIsViewModalOpen }: { viewingDoctor: Doctor; setIsViewModalOpen: (isOpen: boolean) => void }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Doctor Details</h2>
      <div className="flex flex-col items-center">
        <Image
          src={viewingDoctor.profileImage || "/placeholder.svg"}
          alt="Doctor"
          className="w-24 h-24 rounded-full object-cover mb-4"
          width={96}
          height={96}
        />
        <p className="text-lg font-semibold text-primary">{viewingDoctor.name}</p>
        {[
          { key: "speciality", label: "Speciality" },
          { key: "designation", label: "Designation" },
          { key: "degree", label: "Degree" },
          { key: "experience", label: "Experience" },
          { key: "location", label: "Location" },
          { key: "viewCount", label: "View Count" },
          { key: "rating", label: "Rating" },
        ].map(({ key, label }) => (
          <p key={key} className="text-sm text-gray-500">
            {`${label}: ${
              viewingDoctor[key as keyof Doctor] || (key === "rating" ? "No ratings" : "N/A")
            }`}
          </p>
        ))}
        <div className="mt-4">
          <button
            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary/90"
            onClick={() => setIsViewModalOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ViewDoctorModal;
