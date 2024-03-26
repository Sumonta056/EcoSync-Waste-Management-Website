import React, { useState } from "react";

const UpdateModal = ({ isOpen, onClose, user, onUpdate }) => {
  if (!isOpen || !user) return null;

  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 ${isOpen ? "block" : "hidden"}`}>
        <div className="modal bg-white rounded-lg p-6 md:p-8 w-96">
          <div className="modal-content">
            <h2 className="w-full text-2xl font-semibold mb-4 flex flex-col justify-center text-slate-800">
              User Details:
            </h2>
            <div className="mb-6">
              <div className="mb-2">
                <label className="text-gray-700">ID:</label>
                <input
                  type="text"
                  name="_id"
                  value={updatedUser._id}
                  onChange={handleInputChange}
                  className="border border-gray-400 p-2 w-full"
                  readOnly
                />
              </div>
              <div className="mb-2">
                <label className="text-gray-700">Role:</label>
                <div className="border border-gray-400 p-2">{updatedUser.role}</div>
              </div>
              <div className="mb-2">
                <label className="text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleInputChange}
                  className="border border-gray-400 p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label className="text-gray-700">Phone Number:</label>
                <input
                  type="tel"
                  name="phone"
                  value={updatedUser.phone}
                  onChange={handleInputChange}
                  className="border border-gray-400 p-2 w-full"
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => onUpdate(updatedUser)} // Pass updatedUser to onUpdate
              >
                Update
              </button>
              <button
                className="bg-white text-blue-500 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
