import image from "./login.jpg";
import { MdEmail } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUniversalAccess } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { PiAlignCenterHorizontalFill } from "react-icons/pi";
import { MdCancel } from "react-icons/md";

function CreateUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    role: 'UNASSIGNED',
    password: "",
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [modalTitle, setModalTitle] = useState("Content of the modal");
  const [modalVisible, setModalVisible] = useState(false);

  const cancel = () => {
    navigate("/userList");
  }

  const handleOk2 = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      if (modalVisible) {
        setModalVisible(false);
        navigate("/userList");
      }
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUser = async (event) => {
    event.preventDefault();

    for (let field in formData) {
      if (!formData[field]) {
        setModalTitle("User Registration Failed !!");
        setModalText("Please Fill Up All Field, Please !");
        setOpen(true);
        return;
      }
    }

    console.log(formData);

    // Send a POST request to the backend
    try {
      const response = await axios.post("http://localhost:3000/user", formData);

      if (response.status === 200) {
        setModalTitle("User Registration Success !!");
        setModalText("Congratulations, User Created Successfully !");
        setModalVisible(true);
        setOpen(true);
      } else {
        setModalTitle("Failed !!");
        setModalText("User Registration Failed");
        setOpen(true);
      }
    } catch (error) {
      setModalTitle("Failed !!");
      setModalText("User Registration Failed");
      setOpen(true);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-neutral-800">
        <div className="relative flex flex-col w-7/12 space-y-2 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center w-6/12 md:px-8">
            <span className="mb-3 text-3xl font-bold">Registration</span>
            <span className="mb-4 font-light text-gray-400">
              Welcome back! Please enter user details
            </span>
            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-2 text-gray-700 text-md">
                <MdEmail size={20} /> Email
              </span>
              <input
                type="Email"
                className="w-full px-3 py-2 border border-gray-500 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                placeholder="Enter Email Address"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-2 text-gray-700 text-md">
                <FaUserCheck size={20} /> Name
              </span>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full px-3 py-2 border border-gray-500 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={formData.name}
                placeholder="Enter User Name"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-2 text-gray-700 text-md">
                <FaPhoneAlt size={17} /> Phone
              </span>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Enter Phone Number"
                className="w-full px-3 py-2 border border-gray-500 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-2 text-gray-700 text-md">
                <FaUniversalAccess size={19} /> Role
              </span>
              <select
                name="role"
                id="role"
                className="w-full px-3 py-2 text-gray-500 border border-gray-500 rounded-md placeholder:font-light"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="UNASSIGNED">UNASSIGNED</option>
                <option value="STS-MANAGER">STS-MANAGER</option>
                <option value="LANDFILL MANAGER">LANDFILL MANAGER</option>
                <option value="SYSTEM ADMIN">SYSTEM ADMIN</option>
                <option value="CONTRACTOR-MANAGER">CONTRACTOR-MANAGER</option>
              </select>
            </div>
            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-2 text-gray-700 text-md">
                <RiLockPasswordFill size={20} /> Password
              </span>
              <input
                type="password"
                name="password"
                placeholder="Enter User Password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-500 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <div className="flex gap-3">
              <button
                 className="flex justify-center w-full gap-2 p-3 mt-3 mb-2 text-white bg-black rounded-lg text-md gap hover:bg-red-400 hover:text-black hover:border hover:border-red-500"
                onClick={handleUser}
              >
                <PiAlignCenterHorizontalFill size={22} />
                Submit
              </button>
              <button
                className="flex justify-center w-full gap-2 p-3 mt-3 mb-2 text-white bg-black rounded-lg text-md gap hover:bg-red-400 hover:text-black hover:border hover:border-red-500"
                onClick={cancel}
              >
                <MdCancel size={22} /> Cancel
              </button>
            </div>
          </div>

          <div className="relative w-6/12">
            <img
              src={image}
              alt="img"
              className="hidden object-cover w-full rounded-r-2xl md:block"
            />
          </div>
        </div>
      </div>
      <Modal
        title={modalTitle}
        open={open}
        onOk={handleOk2}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{
          style: { backgroundColor: "green", borderColor: "green" },
        }}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}

export default CreateUser;
