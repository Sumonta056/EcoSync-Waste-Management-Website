export function getRoleStatus(status) {
  switch (status) {
    case "STS-MANAGER":
      return (
        <span className="px-2 py-1 capitalize rounded-md text-md text-sky-600 bg-sky-100">
          {status.replaceAll("_", " ").toUpperCase()}
        </span>
      );
    case "SYSTEM ADMIN":
      return (
        <span className="px-2 py-1 text-orange-600 capitalize bg-orange-100 rounded-md text-md">
          {status.replaceAll("_", " ").toUpperCase()}
        </span>
      );
    case "LANDFILL MANAGER":
      return (
        <span className="px-2 py-1 text-teal-600 capitalize bg-teal-100 rounded-md text-md">
          {status.replaceAll("_", " ").toUpperCase()}
        </span>
      );

    default:
      return (
        <span className="px-2 py-1 text-gray-900 capitalize bg-gray-100 rounded-md text-md">
          UNASSIGNED
        </span>
      );
  }
}
