export function getRoleStatus(status) {
  switch (status) {
    case "Open Truck":
      return (
        <span className="px-2 py-1 capitalize rounded-md text-md text-sky-600 bg-sky-100">
          {status.replaceAll("_", " ").toUpperCase()}
        </span>
      );

    case "Carrier":
      return (
        <span className="px-2 py-1 text-green-600 capitalize bg-green-100 rounded-md text-md">
          {status.replaceAll("_", " ").toUpperCase()}
        </span>
      );

    case "Container":
      return (
        <span className="px-2 py-1 capitalize rounded-md text-md text-rose-600 bg-rose-100">
          {status.replaceAll("_", " ").toUpperCase()}
        </span>
      );

    case "Compactor":
      return (
        <span className="px-2 py-1 text-orange-600 capitalize bg-orange-100 rounded-md text-md">
          {status.replaceAll("_", " ").toUpperCase()}
        </span>
      );

    case "Dump Truck":
      return (
        <span className="px-2 py-1 capitalize rounded-md text-md text-stone-600 bg-stone-100">
          {status.replaceAll("_", " ").toUpperCase()}
        </span>
      );

    case "5 Ton":
      return (
        <span className="px-2 py-1 text-pink-600 capitalize bg-pink-100 rounded-md text-md">
          {status.replaceAll("_", " ").toUpperCase()}
        </span>
      );

    case "3 Ton":
      return (
        <span className="px-2 py-1 text-teal-600 capitalize bg-teal-100 rounded-md text-md">
          {status.replaceAll("_", " ").toUpperCase()}
        </span>
      );

    case "7 Ton":
      return (
        <span className="px-2 py-1 capitalize rounded-md bg-cyan-100 text-cyan-600 text-md">
          {status.replaceAll("_", " ").toUpperCase()}
        </span>
      );

    case "10 Ton":
      return (
        <span className="px-2 py-1 text-purple-600 capitalize bg-purple-100 rounded-md text-md">
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