import image from "../../Login/login.jpg";
import { MdEmail } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUniversalAccess } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();
  const handleUser = async (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-neutral-800">
        <div className="relative flex flex-col m-2 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:py-10 md:px-14">
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
                className="w-full p-2 border border-gray-500 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
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
                className="w-full p-2 border border-gray-500 rounded-md placeholder:font-light placeholder:text-gray-500"
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
                className="w-full p-2 border border-gray-500 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-1 text-lg text-gray-700">
                <FaUniversalAccess size={24} /> Role
              </span>
              <input
                type="text"
                name="role"
                id="role"
                className="w-full p-2 border border-gray-500 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-1 text-lg text-gray-700">
                <RiLockPasswordFill size={24} /> Password
              </span>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full p-2 border border-gray-500 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <button
              className="w-full p-4 mt-3 mb-2 text-white bg-black rounded-lg hover:bg-cyan-400 hover:text-black hover:border hover:border-cyan-500"
              onClick={handleUser}
            >
              Submit
            </button>
          </div>

          <div className="relative">
            <img
              src={image}
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
