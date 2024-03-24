import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";

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
    key: "persmission",
    label: "Permission",
    path: "/permisssion",
    icon: <HiOutlineShoppingCart />,
  },
  {
    key: "access",
    label: "Access Roles",
    path: "/userRoles",
    icon: <HiOutlineUsers />,
  },
  {
    key: "transactions",
    label: "Transactions",
    path: "/transactions",
    icon: <HiOutlineDocumentText />,
  },
  {
    key: "addVehicle",
    label: "Add Vehicle",
    path: "/addVehicle",
    icon: <HiOutlineAnnotation />,
  },
  {
    key: "sts",
    label: "STS Vehicle Entry",
    path: "/addVehicl1e",
    icon: <HiOutlineAnnotation />,
  },
  {
    key: "landfill",
    label: "Landfill Vehicle Entry",
    path: "/addVehicl2e",
    icon: <HiOutlineAnnotation />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
