import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { FaTree } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";

import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/constants";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    // window.location.reload();
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col p-3 bg-neutral-900 w-60">
      <div className="flex items-center gap-2 px-1 pt-3">
        <FaTree fontSize={30} color="green" />
        <span className="text-lg text-neutral-200">Eco-Sync</span>
      </div>
      <div className="py-5 flex flex-1 flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <button
          className={classNames(linkClass, "cursor-pointer text-red-500")}
          onClick={handleLogout}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </button>
      </div>
    </div>
  );
}

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === link.path
          ? "bg-neutral-700 text-white"
          : "text-neutral-400",
        linkClass
      )}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
