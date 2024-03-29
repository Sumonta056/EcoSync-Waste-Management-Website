import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { FaTree } from "react-icons/fa6";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { useState, useEffect } from "react";
import axios from "axios";
import { KJUR } from "jsrsasign";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/constants";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {
  const token = localStorage.getItem("access_token");
  let userRole = null;

  if (token) {
    const decodedToken = KJUR.jws.JWS.parse(token);
    userRole = decodedToken.payloadObj?.role;
    console.log(userRole);
  }

  const [dashboard, setDashboard] = useState(false);
  const [userListAccess, setUserListAccess] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);
  const [createSTS, setCreateSTS] = useState(false);
  const [createLandfill, setCreateLandfill] = useState(false);
  const [stsEntry, setStsEntry] = useState(false);
  const [landfillEntry, setLandfillEntry] = useState(false);
  const [seeDumpHistory, setSeeDumpHistory] = useState(false);
  const [accessRoles, setAccessRoles] = useState(false);
  const [profile, setProfile] = useState(false);
  const [seeTransferHistory, setSeeTransferHistory] = useState(false);
  const [seeOptimizeRoute, setSeeOptimizeRoute] = useState(false);
  const [addVehicleEntry, setAddVehicleEntry] = useState(false);

  useEffect(() => {
    if (userRole) {
      axios
        .get(
          `http://localhost:3000/rbac/check/${encodeURIComponent(
            userRole
          )}/permissions`
        )
        .then((response) => {
          response.data.forEach((permission) => {
            switch (permission.permissionName) {
              case "Dashboard":
                setDashboard(permission.status);
                break;
              case "User-List-Access":
                setUserListAccess(permission.status);
                break;
              case "Show-Transaction":
                setShowTransaction(permission.status);
                break;
              case "Create-STS":
                setCreateSTS(permission.status);
                break;
              case "Create-Landfill":
                setCreateLandfill(permission.status);
                break;
              case "STS-Entry":
                setStsEntry(permission.status);
                break;
              case "Landfill-Entry":
                setLandfillEntry(permission.status);
                break;
              case "See-Dump-History":
                setSeeDumpHistory(permission.status);
                break;
              case "Access-Roles":
                setAccessRoles(permission.status);
                break;
              case "Profile":
                setProfile(permission.status);
                break;
              case "See-Transfer-History":
                setSeeTransferHistory(permission.status);
                break;
              case "See-Optimize-Route":
                setSeeOptimizeRoute(permission.status);
                break;
              case "Add-Vehicle-Entry":
                setAddVehicleEntry(permission.status);
                break;
              default:
            }
          });
        })
        .catch((error) => {
          console.error("Error fetching permissions:", error);
        });
    }
  }, [userRole]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    // window.location.reload();
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col p-3 bg-neutral-900 w-60">
      <div className="flex items-center gap-2 px-2 pt-3">
        <FaTrashCanArrowUp fontSize={24} color="green" />
        <span className="text-lg text-neutral-200">Eco-Sync</span>
      </div>
      <div className="py-5 flex flex-1 flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => {
          switch (link.key) {
            case "dashboard":
              return dashboard && <SidebarLink key={link.key} link={link} />;
            case "user-list":
              return (
                userListAccess && <SidebarLink key={link.key} link={link} />
              );
            case "access-roles":
              return accessRoles && <SidebarLink key={link.key} link={link} />;

            // case "transaction":
            //   return (
            //     showTransaction && <SidebarLink key={link.key} link={link} />
            //   );
            case "add-vehicle":
              return (
                addVehicleEntry && <SidebarLink key={link.key} link={link} />
              );
            case "create-sts":
              return createSTS && <SidebarLink key={link.key} link={link} />;
            case "sts-entry":
              return stsEntry && <SidebarLink key={link.key} link={link} />;
            case "optimize-route":
              return (
                seeOptimizeRoute && <SidebarLink key={link.key} link={link} />
              );
            case "transfer-history":
              return (
                seeTransferHistory && <SidebarLink key={link.key} link={link} />
              );
            case "create-landfill":
              return (
                createLandfill && <SidebarLink key={link.key} link={link} />
              );
            case "landfill-entry":
              return (
                landfillEntry && <SidebarLink key={link.key} link={link} />
              );
            case "dump-history":
              return (
                seeDumpHistory && <SidebarLink key={link.key} link={link} />
              );
            case "profile":
              return profile && <SidebarLink key={link.key} link={link} />;

            default:
              return null;
          }
        })}
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
          Exit
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
