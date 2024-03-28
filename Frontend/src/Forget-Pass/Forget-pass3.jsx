import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Modal } from "antd";

export default function ForgetPass3() {
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function changePassword() {
    axios
      .post("http://localhost:3000/auth/change-password", {
        email,
        password,
        confirmPassword,
      })
      .then(() => {
        setModalText(
          "Congratulations! You have successfully changed your password"
        );
        setVisible(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      });
  }

  return (
    <div>
      <section className="w-screen bg-neutral-700">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-gray-900 rounded-lg shadow md:mt-0 sm:max-w-lg sm:p-12">
            <h2 className="flex gap-2 mb-1 text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              <Link
                to="/login"
                style={{
                  color: "#ebca5e",
                }}
              >
                <IoArrowBackCircleSharp size={30} />
              </Link>{" "}
              Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5 mb-6">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  ></input>
                </div>
                <div className="mb-6 ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Terms and Conditions
                    </span>
                  </label>
                </div>
              </div>
            </form>
            <button
              onClick={() => changePassword()}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset passwod
            </button>
          </div>
        </div>
      </section>
      <Modal
        title="Notification"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        okButtonProps={{
          style: {
            backgroundColor: "green",
            borderColor: "green",
            color: "white",
          },
        }}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
}
