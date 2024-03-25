import { useState, useEffect } from "react";
import axios from "axios";
import { getRoleStatus } from "./roles.jsx";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ShowMoreModal from "./ShowMoreModal";
import DeleteModal from "./DeleteModal";
import UpdateModal from "../../UpdateProfile/index.jsx";

export default function RecentOrders() {
  const [userData, setUserData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user")
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
        setRoleData(response.data.role);
        console.log(roleData);
      })
      .catch((error) => console.error("Error:", error));
  }, [roleData]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  const navigate = useNavigate();

  const handleUser = async (event) => {
    event.preventDefault();
    navigate("/createUser");
  };

  const deleteUser = async (userId) => {
    try {
      console.log("Deleting user with ID:", userId);
      await axios.delete(`http://localhost:3000/user/${userId}`);
      const response = await axios.get("http://localhost:3000/user");
      setUserData(response.data);
      setDeleteModal(false); // Close the delete modal after deleting the user
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const openShowMoreModal = (user) => {
    console.log("Opening Show More modal for user:", user);
    setSelectedUserId(user._id); // Update selectedUserId with the correct user ID
    setSelectedUserInfo(user); // Update selectedUserInfo with the correct user information
    setShowMoreModal(true);
  };

  const openDeleteModal = (user) => {
    console.log("Opening Delete modal for user:", user);
    setSelectedUserId(user._id); // Make sure user._id exists
    setSelectedUserInfo(user); // Ensure user object contains necessary properties
    setDeleteModal(true);
  };
  const openUpdateModal = (user) => {
    console.log("Opening Update modal for user:", user);
    setSelectedUserId(user._id); // Make sure user._id exists
    setSelectedUserInfo(user); // Ensure user object contains necessary properties
    setUpdateModal(true);
  };

  // Function to close modals
  const closeShowMoreModal = () => setShowMoreModal(false);
  const closeDeleteModal = () => setDeleteModal(false);
  const closeUpdateModal = () => setUpdateModal(false);

  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      {/* Modal */}
      {/* Rest of the component */}
      <div className="flex flex-row justify-between w-full gap-4 px-4">
        <strong className="flex justify-center gap-2 text-3xl text-gray-600">
          <FaRegUser size={30} />
          User Information
        </strong>
        <button
          type="button"
          onClick={handleUser}
          className="gap-2 text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
        >
          <IoMdPersonAdd size={25} />
          Create New User
        </button>
      </div>

      <div className="mt-3 border-gray-200 rounded-sm border-x">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Role Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{getRoleStatus(`${user.role}`)}</td>
                <td>
                  <div className="flex justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => openShowMoreModal(user)}
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      More Info
                    </button>
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Permission
                    </button>
                    <button
                      type="button"
                      onClick={() => openUpdateModal(user)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <FaEdit size={25} />
                    </button>

                    <button
                      type="button"
                      onClick={() => openDeleteModal(user)}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      <MdDelete size={25} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between w-full gap-3 p-4">
          <button
            className="rounded-lg text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium text-base px-5 py-2.5 text-center mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="rounded-lg text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium text-base px-5 py-2.5 text-center mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(userData.length / usersPerPage)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Show More Modal */}
      <ShowMoreModal
        isOpen={showMoreModal}
        onClose={closeShowMoreModal}
        user={selectedUserInfo}
      />

      <DeleteModal
        isOpen={deleteModal}
        onClose={closeDeleteModal}
        user={selectedUserInfo}
        onDelete={() => deleteUser(selectedUserId)} // Pass selectedUserId instead of selectedUserInfo.id
      />
      <UpdateModal
        isOpen={updateModal}
        onClose={closeUpdateModal}
        user={selectedUserInfo}
        onDelete={() => updateUser(selectedUserId)} // Pass selectedUserId instead of selectedUserInfo.id
      />
    </div>
  );
}
