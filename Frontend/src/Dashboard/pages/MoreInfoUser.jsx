import { useState, useEffect } from "react";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUniversalAccess } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useParams, useNavigate } from "react-router-dom";
import image from "../../Login/login.jpg";

function MoreInfoUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        navigate("/error");
      });
  }, [userId]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-neutral-800">
        <div className="relative flex flex-col w-8/12 space-y-2 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center w-6/12 md:px-14">
            <span className="mb-3 text-4xl font-bold">User Information</span>
            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-1 text-lg text-gray-700">
                <FaUserCheck size={24} /> Name
              </span>
              <span>{userData.name}</span>
            </div>
            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-1 text-lg text-gray-700">
                <MdEmail size={24} /> Email
              </span>
              <span>{userData.email}</span>
            </div>
            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-1 text-lg text-gray-700">
                <FaPhoneAlt size={24} /> Phone
              </span>
              <span>{userData.phone}</span>
            </div>
            <div className="flex flex-col mb-3">
              <span className="flex gap-2 p-1 text-lg text-gray-700">
                <FaUniversalAccess size={24} /> Role
              </span>
              <span>{userData.role}</span>
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
    </>
  );
}

export default MoreInfoUser;
