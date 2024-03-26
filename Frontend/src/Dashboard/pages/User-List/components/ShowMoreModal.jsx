import { getRoleStatus } from "./roles.jsx";

const ShowMoreModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="p-6 bg-white rounded-lg modal md:p-8 w-96">
        <div className="modal-content">
          <h2 className="flex flex-col justify-center w-full mb-4 text-2xl font-semibold text-slate-800">
            User Details:
          </h2>
          {/* Display user information */}

          <div className="mb-6">
            <div className="mb-2">
              <label className="text-gray-700">Name</label>
              <div className="p-2 font-medium border border-gray-400">{user.name}</div>
            </div>
            <div className="mb-2">
              <label className="text-gray-700">ID:</label>
              <div className="p-2 border border-gray-400 text-neutral-600">{user._id}</div>
            </div>
            <div className="mb-2">
              <label className="text-gray-700">Role:</label>
              <div className="p-2 border border-gray-400">
                {getRoleStatus(user.role)}
              </div>
            </div>
            <div className="mb-2">
              <label className="text-gray-700">Email:</label>
              <div className="p-2 border border-gray-400">
                <a href={`mailto:${user.email}`} className="text-cyan-600">
                  {user.email}
                </a>
              </div>
            </div>
            <div className="mb-2">
              <label className="text-gray-700">Phone Number:</label>
              <div className="p-2 border border-gray-400">
                <a href={`tel:${user.phone}`} className="text-neutral-600">
                  {user.phone}
                </a>
              </div>
            </div>
            {/* Add more user information fields here if needed */}
          </div>
          {/* <div className="mb-6">
            <p className="mb-2 text-gray-700">ID: {user._id}</p>
            <p className="mb-2 text-gray-700">Role: {getRoleStatus(user.role)}</p>
            <p className="mb-2 text-gray-700">Email: <a href={`mailto:${user.email}`} className="text-blue-600">{user.email}</a></p>
            <p className="mb-2 text-gray-700">Phone Number: <a href={`tel:${user.phone}`} className="text-blue-600">{user.phone}</a></p>
       
          </div> */}
          <div className="flex justify-center">
            {" "}
            {/* Added flex container to center button */}
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMoreModal;
