import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";

import { SiSecurityscorecard } from "react-icons/si";
import { FaLandmark } from "react-icons/fa6";
import { MdCreateNewFolder } from "react-icons/md";
import { RiMoneyPoundBoxFill } from "react-icons/ri";
import { FaTruckFront } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "ueser",
    label: "User List",
    path: "/userList",
    icon: <HiOutlineCube />,
  },
  {
    key: "access",
    label: "Access Roles",
    path: "/userRoles",
    icon: <MdOutlineSecurity />,
  },
  {
    key: "transactions",
    label: "Transactions",
    path: "/transactions",
    icon: <RiMoneyPoundBoxFill />,
  },
  {
    key: "addVehicle",
    label: "Add Vehicle",
    path: "/addVehicle",
    icon: <FaTruckFront />,
  },
  {
    key: "createSTS",
    label: "Create STS",
    path: "/createSTS",
    icon: <MdCreateNewFolder />,
  },
  {
    key: "sts",
    label: "STS Entry",
    path: "/sts",
    icon: <SiSecurityscorecard />,
  },
  {
    key: "sts",
    label: "See Transfer History",
    path: "/stshistory",
    icon: <SiSecurityscorecard />,
  },
  {
    key: "createLandfill",
    label: "Create Landfill",
    path: "/createLandfill",
    icon: <MdCreateNewFolder />,
  },
  {
    key: "landfill",
    label: "Landfill Entry",
    path: "/landfill",
    icon: <FaLandmark />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "profile",
    label: "Profile",
    path: "/profile",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/about",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
