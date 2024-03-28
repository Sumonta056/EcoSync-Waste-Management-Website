import User from "./components/UserList.jsx";
import { useState } from "react";
import { Modal, message } from "antd";
import axios from "axios";
import { HiOutlineSearch } from "react-icons/hi";
import { MdContentPasteSearch } from "react-icons/md";

export default function UserList() {
  const [searchInput, setSearchInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = async (e) => {
    console.log(searchInput);
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/user/${searchInput}`
      );
      if (response.message === "User not found") {
        message.error("User not found ! ");
      } else {
        setUserData(response.data);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error(error);
      message.error("User not found !");
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col w-full gap-2 mx-auto">
        <form className="w-full" onSubmit={handleSearch}>
          <div className="relative">
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <MdContentPasteSearch size={25} />
            </div>
            <input
              type="search"
              id="default-search"
              value={searchInput}
              onChange={handleSearchInputChange}
              className="block w-full px-8 py-5 text-gray-900 placeholder-gray-600 border border-gray-300 rounded-lg text-md px- bg-white-100 ps-10 focus:ring-black-500 focus:border-gray-500"
              placeholder="Search User by ID"
              required
            />
            <button
              type="submit"
              className="text-white flex gap-2 absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-10 py-3 "
            >
              <HiOutlineSearch size={20} /> Search
            </button>
          </div>
        </form>

        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{
            style: { backgroundColor: "green", borderColor: "green" },
          }}
        >
          {userData && (
            <div className="p-4 text-lg">
              <h2 className="pb-3 text-2xl font-bold text-center text-cyan-800">
                Searched User Information !!
              </h2>
              <div
                className="flex flex-col gap-2"
                style={{ marginBottom: "10px" }}
              >
                <label>ID:</label>
                <input
                  type="text"
                  className="p-2"
                  value={userData._id}
                  readOnly
                  style={{ border: "1px solid black" }}
                />
              </div>

              <div
                className="flex flex-col gap-2"
                style={{ marginBottom: "10px" }}
              >
                <label>Name:</label>
                <input
                  type="text"
                  className="p-2 font-medium"
                  value={userData.name}
                  readOnly
                  style={{ border: "1px solid black" }}
                />
              </div>

              <div
                className="flex flex-col gap-2"
                style={{ marginBottom: "10px" }}
              >
                <label>Email:</label>
                <input
                  type="text"
                  className="p-2"
                  value={userData.email}
                  readOnly
                  style={{ border: "1px solid black" }}
                />
              </div>
              <div
                className="flex flex-col gap-2"
                style={{ marginBottom: "10px" }}
              >
                <label>User Role:</label>
                <input
                  type="text"
                  className="p-2 font-medium text-purple-600"
                  value={userData.role}
                  readOnly
                  style={{ border: "1px solid black" }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Phone</label>
                <input
                  type="text"
                  className="p-2"
                  value={userData.phone}
                  readOnly
                  style={{ border: "1px solid black" }}
                />
              </div>
            </div>
          )}
        </Modal>
        <User />
      </div>
    </div>
  );
}
