import React from "react";
import { getRoleStatus } from "./roles.jsx";

const ShowMoreModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="modal bg-white rounded-lg p-6 md:p-8 w-96">
        <div className="modal-content">
          <h2 className="text-xl font-semibold mb-4">User Details: <span className="text-xl font-bold text-gray-900 uppercase">{user.name}</span></h2>
          {/* Display user information */}
          <div className="mb-6">
            <p className="text-gray-700 mb-2">ID: {user._id}</p>
            <p className="text-gray-700 mb-2">Role: {getRoleStatus(user.role)}</p>
            <p className="text-gray-700 mb-2">Email: <a href={`mailto:${user.email}`} className="text-blue-600">{user.email}</a></p>
            <p className="text-gray-700 mb-2">Phone Number: <a href={`tel:${user.phone}`} className="text-blue-600">{user.phone}</a></p>
            {/* Add more user information fields here if needed */}
          </div>
          <div className="flex justify-center"> {/* Added flex container to center button */}
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
