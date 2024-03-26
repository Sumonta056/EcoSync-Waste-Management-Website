import React, { useState } from "react";

const PermissionModal = ({ isOpen, onClose, user, onPermission}) => {
  if (!isOpen || !user) return null;

  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      
    }));
    console.log(name, value);
  };
  

  console.log("component:" + updatedUser);
  
  
  return (
    <>
      {/* Main modal content */}
      <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 ${isOpen ? "block" : "hidden"}`}>
      <div className="modal bg-white rounded-lg p-6 md:p-8 w-96">
        <div className="modal-content">
          <h2 className="w-full text-2xl font-semibold mb-4 flex flex-col justify-center text-slate-800">
            User Details:
          </h2>
          {/* Display user information */}
          <div className="mb-6">
            <div className="mb-2">
              <label className="text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 w-full"
                readOnly
              />
            </div>
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
              <select
              name="role"
              value={updatedUser.role}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 w-full"
            >
                <option value="UNASSIGNED">UNASSIGNED</option>
                <option value="STS-MANAGER">STS-MANAGER</option>
                <option value="LANDFILL MANAGER">LANDFILL MANAGER</option>
                <option value="SYSTEM ADMIN">SYSTEM ADMIN</option>
            </select>
            </div>
            
            {/* Add more user information fields here if needed */}
          </div>
          <div className="flex justify-center gap-4">
          <button
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    onClick={() => {
      const updatedUserInfo = {
        ...updatedUser,
        role: updatedUser.role,
      };
      onPermission(updatedUserInfo);
    }}
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
      {/* Success modal */}
      
    </>
  );
  
};

export default PermissionModal;