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

function CreateUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    role: "",
    password: "",
  });

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [modalTitle, setModalTitle] = useState("Content of the modal");
  const [modalVisible, setModalVisible] = useState(false);

  const handleOk2 = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      if (modalVisible) {
        setModalVisible(false);
        navigate("/dashboard");
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
        <div className="relative flex flex-col w-8/12 space-y-2 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center w-6/12 md:px-14">
            <span className="mb-3 text-4xl font-bold">Registration</span>
            <span className="mb-4 font-light text-gray-400">
              Welcome back! Please enter user details
            </span>
            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-1 text-lg text-gray-700">
                <MdEmail size={24} /> Email
              </span>
              <input
                type="Email"
                className="w-full p-4 border border-gray-500 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                placeholder="Enter Email Address"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-1 text-lg text-gray-700">
                <FaUserCheck size={24} /> Name
              </span>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full p-3 border border-gray-500 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={formData.name}
                placeholder="Enter User Name"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-1 text-lg text-gray-700">
                <FaPhoneAlt size={24} /> Phone
              </span>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Enter Phone Number"
                className="w-full p-4 border border-gray-500 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-1 text-lg text-gray-700">
                <FaUniversalAccess size={24} /> Role
              </span>
              <select
                name="role"
                id="role"
                className="w-full p-4 text-gray-500 border border-gray-500 rounded-md placeholder:font-light"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="" className="text-gray-400">
                  Select User Role
                </option>
                <option value="UNASSIGNED">UNASSIGNED</option>
                <option value="STS-MANAGER">STS-MANAGER</option>
                <option value="LANDFILL MANAGER">LANDFILL MANAGER</option>
                <option value="SYSTEM ADMIN">SYSTEM ADMIN</option>
              </select>
            </div>
            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-1 text-lg text-gray-700">
                <RiLockPasswordFill size={24} /> Password
              </span>
              <input
                type="text"
                name="password"
                placeholder="Enter User Password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-500 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <button
              className="w-full p-4 mt-3 mb-2 text-white bg-black rounded-lg hover:bg-cyan-400 hover:text-black hover:border hover:border-cyan-500"
              onClick={handleUser}
            >
              Submit
            </button>
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