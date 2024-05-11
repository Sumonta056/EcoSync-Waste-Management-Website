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
import { FaHandsHelping, FaDolly } from "react-icons/fa";
import { TbUsersGroup } from "react-icons/tb";
import { FaApplePay } from "react-icons/fa";
import { MdCollections } from "react-icons/md";
import { MdMonitorHeart } from "react-icons/md";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "user-list",
    label: "User List",
    path: "/userList",
    icon: <FaPeopleRobbery />,
  },
  {
    key: "access-roles",
    label: "Access Roles",
    path: "/userRoles",
    icon: <MdOutlineSecurity />,
  },
  {
    key: "transaction",
    label: "Billing Transactions",
    path: "/transactions",
    icon: <RiMoneyPoundBoxFill />,
  },
  {
    key: "add-vehicle",
    label: "Add Vehicle",
    path: "/addVehicle",
    icon: <FaTruckFront />,
  },
  {
    key: "create-sts",
    label: "Create New STS",
    path: "/createSTS",
    icon: <MdCreateNewFolder />,
  },
  {
    key: "sts-entry",
    label: "STS Entry Form",
    path: "/sts",
    icon: <HiOutlineCube />,
  },
  {
    key: "optimize-route",
    label: "Optimized Route",
    path: "/map",
    icon: <FaMapMarkedAlt />,
  },
  {
    key: "transfer-history",
    label: "See Transfer History",
    path: "/stshistory",
    icon: <MdHistory />,
  },
  {
    key: "create-landfill",
    label: "Create Landfill",
    path: "/createLandfill",
    icon: <IoCreateSharp />,
  },
  {
    key: "landfill-entry",
    label: "Landfill Entry Form",
    path: "/landfill",
    icon: <FaLandmark />,
  },

  {
    key: "transport-entry", // new case
    label: "Transport Entry",
    path: "/stsLoad",
    icon: <FaDolly />,
  },
  {
    key: "dump-history",
    label: "See Dump History",
    path: "/dumpHistory",
    icon: <FaDumpster />,
  },
  {
    key: "Create-Contract-Manager", // new case
    label: "Create Contractor",
    path: "/contractor",
    icon: <FaHandsHelping />,
  },
  {
    key: "Registration-Employee",
    label: "Create Employee",
    path: "/createEmployee",
    icon: <TbUsersGroup />,
  },
  {
    key: "STS-Load-Entry",
    label: "STS-Load-Entry",
    path: "/stsLoad",
    icon: <TbUsersGroup />,
  },
  {
    key: "contractorhistory",
    label: "Contract Billing",
    path: "/contractorhistory",
    icon: <FaApplePay />,
  },

  {
    key: "Collection-Plan",
    label: "Collection Plan",
    path: "/homecollection",
    icon: <MdCollections />,
  },
  {
    key: "Monitor-Workers",
    label: "Monitor-Workers",
    path: "/contractMonitor",
    icon: <MdMonitorHeart/>,
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
    label: "About Us",
    path: "/about",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
