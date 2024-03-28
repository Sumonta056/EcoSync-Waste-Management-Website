import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";

import { FaLandmark } from "react-icons/fa6";
import { MdCreateNewFolder } from "react-icons/md";
import { RiMoneyPoundBoxFill } from "react-icons/ri";
import { FaTruckFront } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { IoCreateSharp } from "react-icons/io5";
import { FaPeopleRobbery } from "react-icons/fa6";
import { FaDumpster } from "react-icons/fa";

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
    icon: <FaPeopleRobbery />,
  },
  {
    key: "access",
    label: "Access Roles",
    path: "/userRoles",
    icon: <MdOutlineSecurity />,
  },
  {
    key: "transactions",
    label: "Billing Transactions",
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
    label: "Create New STS",
    path: "/createSTS",
    icon: <MdCreateNewFolder />,
  },
  {
    key: "sts",
    label: "STS Entry Form",
    path: "/sts",
    icon: <HiOutlineCube />,
  },
  {
    key: "map",
    label: "Optimized Route",
    path: "/map",
    icon: <FaMapMarkedAlt />,
  },
  {
    key: "sts",
    label: "See Transfer History",
    path: "/stshistory",
    icon: <MdHistory />,
  },
  {
    key: "createLandfill",
    label: "Create Landfill",
    path: "/createLandfill",
    icon: <IoCreateSharp />,
  },
  {
    key: "landfill",
    label: "Landfill Entry Form",
    path: "/landfill",
    icon: <FaLandmark />,
  },
  {
    key: "dumpHistory",
    label: "See Dump History",
    path: "/dumpHistory",
    icon: <FaDumpster />,
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
