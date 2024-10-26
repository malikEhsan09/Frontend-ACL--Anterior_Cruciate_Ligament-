"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import { PiDetectiveFill } from "react-icons/pi";
import { FaUsersCog } from "react-icons/fa";
import { MdAssessment } from "react-icons/md";
import { RiDeviceRecoverFill } from "react-icons/ri";
import { MdMonitorHeart } from "react-icons/md";
import { SiChatbot } from "react-icons/si";
import { MdNotificationsActive } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";

const content = [
  {
    title: "Organization’s Profile Management ",
    description:
      "This module facilitates comprehensive profile management, ensuring Players can create, personalize, and maintain their accounts. Players will also be able to set their rehabilitation goals and track their recovery progress.",
    icon: <FaUsersCog />,
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white font-bold">
        Organization’s Profile Management
      </div>
    ),
  },
  {
    title: "ACL Tear Detection ",
    description:
      "This module aims to facilitate the detection of ACL (Anterior Cruciate Ligament) tears through MRI file/scans. Player can upload MRI file in format such as .npy and .pck. The system compares the Players-provided files with known patterns associated with ACL tears to aid in injury assessment. To maintain accuracy, the system provides user-friendly tip that the uploaded MRI file does not exceeds the 200MB limit.",
    icon: <PiDetectiveFill />,
    content: (
      <div className="h-full w-full flex items-center justify-center text-white bg-[linear-gradient(to_bottom_right,var(--blue-500),var(--indigo-500))] font-bold">
        ACL Tear Detection
      </div>
    ),
  },
  {
    title: "Injury assessment and reporting ",
    description:
      "This module focuses on assessing ACL tears and providing comprehensive reports. Players receive detailed reports explaining the severity of their ACL tear and personalized recommendations based on the severity level. The ACL tear assessment reports are easily accessible within the application, ensuring Players can quickly access and understand their injury assessment and recommended actions.",
    icon: <MdAssessment />,
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--black-800),var(--gray-600))] flex items-center justify-center text-black font-bold">
        Injury assessment and reporting
      </div>
    ),
  },
  {
    title: "Recovery Assistance and Recommendations",
    description:
      "This module aids players in injury rehabilitation with personalized recovery plans, tailored exercises, and performance feedback. It helps track progress, visualize milestones, and provides exercise reminders to ensure consistency, promoting effective healing and recovery.",
    icon: <RiDeviceRecoverFill />,
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--gray-400),var(--gray-200))] flex items-center justify-center text-[#333] font-bold">
        Running Out of Content
      </div>
    ),
  },
  {
    title: " Track and Evaluate",
    description:
      "This module aids players in injury rehabilitation with personalized recovery plans, tailored exercises, and performance feedback. It helps track progress, visualize milestones, and provides exercise reminders to ensure consistency, promoting effective healing and recovery.",
    icon: <MdMonitorHeart />,
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--indigo-500),var(--purple-400))] flex items-center justify-center text-white font-bold">
        Track and Evaluate
      </div>
    ),
  },
  {
    title: " AI Health Assistant (ChatBot)",
    description:
      "This module aims to empower Players with personalized, informative support for managing their health needs efficiently by providing quick and easy responses to their queries regarding ACL injury and other common medical issues.",
    icon: <SiChatbot />,
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--indigo-500),var(--purple-400))] flex items-center justify-center text-white font-bold">
        AI Health Assistant (ChatBot)
      </div>
    ),
  },
  {
    title: "Notifications and Alerts",
    description:
      "This module focuses on enhancing Player engagement and experience through effective notifications and alerts within the application. It includes features aimed at improving user interaction, keeping Players informed about app features and updates, and providing customization options for notification preferences. Overall, this module aims to enhance user engagement, retention, and satisfaction by keeping Players informed and in control of their notification experience.",
    icon: <MdNotificationsActive />,
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--indigo-500),var(--purple-400))] flex items-center justify-center text-white font-bold">
        Notifications and Alerts
      </div>
    ),
  },
  {
    title: " Online Payment",
    description:
      "This module facilitates online payment processes within the system. Players can pay through various online payment methods to access the ACL (Anterior Cruciate Ligament) condition. Additionally, the system allows Players to generate, view, and download payment invoices for their records. Registeredplayers within the club can access the system for free by entering a unique promo code, while otherswill need to pay for app usage. All transactions made through the system are recorded to maintain a transparent and accountable financial record. ",
    icon: <RiSecurePaymentLine />,
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--indigo-500),var(--purple-400))] flex items-center justify-center text-white font-bold">
        Online Payment
      </div>
    ),
  },
  {
    title: " Feedback and Sentimental Analysis",
    description:
      "This module facilitates a feedback loop to collect Player ratings and input on the application. Players can rate usability and overall experience through a star rating system and provide detailed feedback via comments or surveys. This feedback is used to identify improvement areas and address concerns, ensuring a user-centric approach to development.",
    icon: <VscFeedback />,
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--indigo-500),var(--purple-400))] flex items-center justify-center text-white font-bold">
        Feedback and Sentimental Analysis
      </div>
    ),
  },
  {
    title: "Doctor’s Appointment ",
    description:
      "This module facilitates a feedback loop to collect Player ratings and input on the application. Players can rate usability and overall experience through a star rating system and provide detailed feedback via comments or surveys. This feedback is used to identify improvement areas and address concerns, ensuring a user-centric approach to development.",
    icon: <FaUserDoctor />,
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--indigo-500),var(--purple-400))] flex items-center justify-center text-white font-bold">
        Doctor’s Appointment
      </div>
    ),
  },
];

export function ModuleContent() {
  return (
    <div className="p-10" id="modules">
      <StickyScroll content={content} />
    </div>
  );
}
