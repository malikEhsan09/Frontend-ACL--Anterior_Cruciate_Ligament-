// components/Footer.js
import { Github, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.svg";
// import { FloatingDockDemo } from "./FloatingDockDemo";

export default function Footer() {
  return (
    <div className="w-full py-10 bg-gray-100 border-t border-gray-300 flex flex-col items-center mt-6">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-xl px-5 md:px-20">
        {/* Logo and Social Icons */}
        <div className="flex flex-col items-center md:items-start gap-3 mb-6 md:mb-0">
          <Link href="/" className="flex items-center mb-5 no-underline">
            <Image
              src={logo}
              alt="Medic Icon"
              width={50}
              height={50}
              className="item-center"
            />
          </Link>

          <div className="flex gap-5">
            <Link
              href="https://github.com"
              aria-label="GitHub"
              className="text-black hover:text-gray-800 transition"
            >
              <Github size={20} />
            </Link>
            <Link
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="text-black hover:text-gray-800 transition"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-black hover:text-gray-800 transition"
            >
              <Instagram size={20} />
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-8 md:flex md:gap-24">
          <div className="flex flex-col gap-4">
            <div className="text-black font-medium">Company</div>
            <div className="text-gray-500">Home</div>
            <div className="text-gray-500">Subscription</div>
            <div className="text-gray-500">Blog</div>
            <div className="text-gray-500">Careers</div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-black font-medium">Products</div>
            <div className="text-gray-500">Free</div>
            <div className="text-gray-500">Plus</div>
            <div className="text-gray-500">Premium</div>
            <div className="text-gray-500">Business</div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-black font-medium">Help Center</div>
            <div className="text-gray-500">Privacy Policy</div>
            <div className="text-gray-500">Terms & Conditions</div>
            <div className="text-gray-500">Cookies</div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-black font-medium">Support</div>
            <div className="text-gray-500">Help Centre</div>
            <div className="text-gray-500">Contact us</div>
            <div className="text-gray-500 underline">
              ACL_Tear-Detector@gmail.com
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-300 opacity-30 my-6"></div>
      <div className="text-gray-500 text-sm text-center">
        {/* <FloatingDockDemo /> */}
        Copyright © 2024 ACL Tear Detector. All rights reserved
      </div>
    </div>
  );
}
