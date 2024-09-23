"use client";

import React from "react";
import notFound from "@/public/assets/404.gif";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/player");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      {/* Clicking on the image redirects to the dashboard */}
      <div className="cursor-pointer" onClick={handleRedirect}>
        <Image
          src={notFound}
          alt="Page not found"
          layout="fill" // Makes the image fill its container
          objectFit="contain" // Ensures the image scales correctly
        />
      </div>
    </div>
  );
};

export default NotFound;
