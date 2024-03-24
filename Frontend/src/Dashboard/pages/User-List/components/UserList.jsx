import { useState, useEffect } from "react";
import axios from "axios";
import { getRoleStatus } from "./roles.jsx";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function RecentOrders() {
  const [userData, setUserData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

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
  const handleMoreInfo = (userId) => {
    setSelectedUserId(userId);
    navigate(`/moreInfoUser/${userId}`);
  };
  const deleteUser = async (userId) => {
    try {
      // Log the ID before sending the delete request
      console.log("Deleting user with ID:", userId);
  
      await axios.delete(`http://localhost:3000/user/${userId}`);
      // Refresh the user list after deletion
      const response = await axios.get("http://localhost:3000/user");
      setUserData(response.data);
      // Close the modal after deletion
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const openModal = (userId) => {
    const user = userData.find((user) => user._id === userId);
    setSelectedUserId(userId);
    setSelectedUserInfo(user);
    setShowModal(true);
  };
  
  const closeModal = () => setShowModal(false);

  return (
    <div className="flex-1 px-4 pt-3 pb-4 bg-white border border-gray-200 rounded-sm">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            {/*content*/}
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                <h3 className="text-3xl font-semibold">
                  Confirmation
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={closeModal}
                >
                  <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
             
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
                <div className="flex items-center justify-center min-h-screen px-4 text-center">
                  <div className="fixed inset-0 bg-black opacity-50"></div>
                  <div className="relative z-50 inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                    {/* Modal content */}
                    <div>
                      {/* Header */}
                      <div className="flex justify-between items-center pb-3 mb-4 border-b">
                        <h3 className="text-xl font-semibold">Confirmation</h3>
                        <button
                          className="focus:outline-none"
                          onClick={closeModal}
                        >
                          <svg
                            className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      {/* Body */}
                      <div className="pb-4">
                        <p className="text-lg">Are you sure you want to delete this user?</p>
                        <div className="my-4 flex items-center">
                          <p className="text-lg font-semibold mr-2">ID:</p>
                          <p className="text-lg">{selectedUserInfo ? selectedUserInfo._id : ''}</p>
                        </div>

                        <div className="my-4 flex items-center">
                          <p className="text-lg font-semibold mr-2">Name:</p>
                          <p className="text-lg">{selectedUserInfo ? selectedUserInfo.name : ''}</p>
                        </div>
                        <div className="my-4 flex items-center">
                          <p className="text-lg font-semibold mr-2">Role:</p>
                          <p className="text-lg">{selectedUserInfo ? selectedUserInfo.role : ''}</p>
                        </div>
                      </div>
                      {/* Footer */}
                      <div className="flex justify-end pt-2 border-t">
                        <button
                          className="px-4 py-2 mr-2 text-sm font-semibold text-gray-500 uppercase border border-gray-300 rounded-md focus:outline-none hover:text-gray-700 hover:border-gray-400"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md focus:outline-none hover:bg-red-600"
                          onClick={() => deleteUser(selectedUserId)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => deleteUser(selectedUserId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                      onClick={() => handleMoreInfo(user._id)}
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      More Info
                    </button>
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-                    .2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Permission
                      </button>
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        <FaEdit size={25} />
                      </button>
  
                      <button
                        type="button"
                        onClick={() => openModal(user._id)}
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
      </div>
    );
  }
  
