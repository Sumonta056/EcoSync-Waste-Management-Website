import RoleBasedPermission from "./RoleBasedPermission.jsx";
import History from "./history.jsx";

export default function Index() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row w-full gap-4">
        <History />
        <RoleBasedPermission />
      </div>
    </div>
  );
}
