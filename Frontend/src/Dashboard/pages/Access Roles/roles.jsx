export function getRoleStatus(status) {
  switch (status) {
    case "STS-MANAGER":
      return (
        <span className="px-2 py-1 capitalize rounded-md text-md text-sky-600 bg-sky-100">
          {status}
        </span>
      );
    case "SYSTEM ADMIN":
      return (
        <span className="px-2 py-1 text-orange-600 capitalize bg-orange-100 rounded-md text-md">
          {status}
        </span>
      );
    case "LANDFILL MANAGER":
      return (
        <span className="px-2 py-1 text-teal-600 capitalize bg-teal-100 rounded-md text-md">
          {status}
        </span>
      );

    case "Dashboard":
      return (
        <span className="px-2 py-1 capitalize rounded-md text-md text-sky-600 bg-sky-100">
          {status}
        </span>
      );

    case "User-List-Access":
      return (
        <span className="px-2 py-1 text-green-600 capitalize bg-green-100 rounded-md text-md">
          {status}
        </span>
      );
    case "Show-Billing-Transaction":
      return (
        <span className="px-2 py-1 capitalize rounded-md text-md text-rose-600 bg-rose-100">
          {status}
        </span>
      );
    case "Add-Vehicle-Entry":
      return (
        <span className="px-2 py-1 capitalize rounded-md text-md text-stone-600 bg-stone-100">
          {status}
        </span>
      );
    case "Create-STS":
      return (
        <span className="px-2 py-1 text-pink-600 capitalize bg-pink-100 rounded-md text-md">
          {status}
        </span>
      );
    case "Create-Landfill":
      return (
        <span className="px-2 py-1 text-teal-600 capitalize bg-teal-100 rounded-md text-md">
          {status}
        </span>
      );
    case "STS-Entry":
      return (
        <span className="px-2 py-1 capitalize rounded-md bg-cyan-100 text-cyan-600 text-md">
          {status}
        </span>
      );
    case "Landfill-Entry":
      return (
        <span className="px-2 py-1 text-purple-600 capitalize bg-purple-100 rounded-md text-md">
          {status}
        </span>
      );
    case "Profile":
      return (
        <span className="px-2 py-1 text-gray-900 capitalize bg-gray-100 rounded-md text-md">
          {status}
        </span>
      );
    case "Access-Roles":
      return (
        <span className="px-2 py-1 text-teal-600 capitalize bg-teal-100 rounded-md text-md">
          {status}
        </span>
      );

    case "See-Optimize-Route":
      return (
        <span className="px-2 py-1 text-red-600 capitalize bg-red-100 rounded-md text-md">
          {status}
        </span>
      );

    case "See-Transfer-History":
      return (
        <span className="px-2 py-1 capitalize rounded-md bg-sky-100 text-sky-900 text-md">
          {status}
        </span>
      );

      case "See-Dump-History":
        return (
          <span className="px-2 py-1 capitalize rounded-md bg-violet-100 text-violet-900 text-md">
            {status}
          </span>
        );

    default:
      return (
        <span className="px-2 py-1 text-gray-900 capitalize bg-gray-100 rounded-md text-md">
          {status}
        </span>
      );
  }
}
