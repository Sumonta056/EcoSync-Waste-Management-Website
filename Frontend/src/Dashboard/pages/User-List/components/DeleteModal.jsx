import React from "react";
import { getRoleStatus } from "./roles.jsx";

const DeleteModal = ({ isOpen, onClose, user, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-lg shadow-lg text-black w-110">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-cyan-800">Are you sure to delete this user?</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        {/* <p className="mt-4">ID: <span className="font-semibold">{user._id}</span></p>
        <p className="mt-2">Name: <span className="font-semibold">{user.name}</span></p>
        <p className="mt-2">Role: <span className="font-semibold">{getRoleStatus(user.role)}</span></p> */}

<div className="mb-6 mt-3">
  <div className="mb-2">
    <label className="text-gray-700">ID:</label>
    <div className="border border-gray-400 p-2">
      <span className="">{user._id}</span>
    </div>
  </div>
  <div className="mb-2">
    <label className="text-gray-700">Name:</label>
    <div className="border border-gray-400 p-2">
      <span className="font-semibold">{user.name}</span>
    </div>
  </div>
  <div className="mb-2">
    <label className="text-gray-700">Role:</label>
    <div className="border border-gray-400 p-2">
      <span className="">{getRoleStatus(user.role)}</span>
    </div>
  </div>
  {/* Add more user information fields here if needed */}
</div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-md mr-2 bg-white text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400">Cancel</button>
          <button onClick={() => onDelete(user._id)} className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
