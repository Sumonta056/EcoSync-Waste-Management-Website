export function getRoleStatus(status, fieldType) {
  const normalizedStatus = status.toUpperCase().replace(/\s+/g, '');

  switch (normalizedStatus) {
    // Cases for type field
    case "OPENTRUCK":
      return (
        <span className={`px-2 py-1 capitalize rounded-md text-md ${fieldType === 'type' ? 'text-sky-600 bg-sky-100' : 'text-gray-900 bg-gray-100'}`}>
          {status}
        </span>
      );
    case "DUMPTRUCK":
      return (
        <span className={`px-2 py-1 capitalize rounded-md text-md ${fieldType === 'type' ? 'text-stone-600 bg-stone-100' : 'text-gray-900 bg-gray-100'}`}>
          {status}
        </span>
      );
    // Cases for capacity field
    case "5TON":
      return (
        <span className={`px-2 py-1 text-pink-600 capitalize bg-pink-100 rounded-md text-md ${fieldType === 'capacity' ? 'text-pink-600 bg-pink-100' : 'text-gray-900 bg-gray-100'}`}>
          {status}
        </span>
      );
    case "3TON":
      return (
        <span className={`px-2 py-1 text-teal-600 capitalize bg-teal-100 rounded-md text-md ${fieldType === 'capacity' ? 'text-teal-600 bg-teal-100' : 'text-gray-900 bg-gray-100'}`}>
          {status}
        </span>
      );
    case "7TON":
      return (
        <span className={`px-2 py-1 capitalize rounded-md bg-cyan-100 text-cyan-600 text-md ${fieldType === 'capacity' ? 'text-cyan-600 bg-cyan-100' : 'text-gray-900 bg-gray-100'}`}>
          {status}
        </span>
      );
    case "10TON":
      return (
        <span className={`px-2 py-1 text-purple-600 capitalize bg-purple-100 rounded-md text-md ${fieldType === 'capacity' ? 'text-purple-600 bg-purple-100' : 'text-gray-900 bg-gray-100'}`}>
          {status}
        </span>
      );
    default:
      return (
        <span className={`px-2 py-1 text-gray-900 capitalize bg-gray-100 rounded-md text-md`}>
          UNASSIGNED
        </span>
      );
  }
}
