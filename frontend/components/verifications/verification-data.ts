import { IoSchoolOutline } from "react-icons/io5";
import { PiOfficeChair } from "react-icons/pi";
import { BsCamera } from "react-icons/bs";
import { IoIosHome } from "react-icons/io";
import { TiBusinessCard } from "react-icons/ti";

// Base verification types - status will be determined dynamically
export const verificationTypes = [
  {
    id: "identity-verification",
    title: "Identity Verification",
    description: "Verify your identity with government-issued documents",
    icon: TiBusinessCard,
    status: "not-added" // Will be updated dynamically
  },
  {
    id: "proof-of-address",
    title: "Proof of Address",
    description: "Verify your residential address with utility bills or bank statements",
    icon: IoIosHome,
    status: "not-added"
  },
  {
    id: "selfie",
    title: "Selfie Verification",
    description: "Take a selfie to match with your government ID",
    icon: BsCamera,
    status: "not-added"
  },
  {
    id: "student",
    title: "Student Verification",
    description: "Verify your student status with educational documents",
    icon: IoSchoolOutline,
    status: "not-added"
  },
  {
    id: "employment",
    title: "Employment Verification",
    description: "Verify your employment status and income",
    icon: PiOfficeChair,
    status: "coming-soon"
  }
];
