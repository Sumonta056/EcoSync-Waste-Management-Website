import React, { useState } from "react";
import { TERipple } from "tw-elements-react";
import logo from "../Home/Images/logo.png";
import { Input, Label } from "keep-react";
import backgroundImage from "./login.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const EmailOTPContext = React.createContext();
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function ForgetPass1() {
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    setModalText("Please wait, loading...");
    setVisible(true);
    event.preventDefault();
    // console.log(`Email submitted: ${email}`);
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    try {
      const response = await axios
        .post("http://localhost:3000/auth/reset-password/initiate", {
          OTP, // use newOTP
          recipient_email: email,
        })
        .then((response) => {
          if (response.data === "found") {
            setVisible(false);
            // Set modal text
            setModalText("Please check your email for OTP verification");
            // Show modal
            setVisible(true);
            // Hide modal and navigate to next page after 2 seconds
            setTimeout(() => {
              setVisible(false);
              navigate("/auth/reset-password/confirm", {
                state: { email, OTP },
              });
            }, 1500);
          } else if (response.data.error === "User not found!") {
            setVisible(false);
            // Set modal text
            setModalText("User not found in database");
            // Show modal
            setVisible(true);
            // Hide modal and reload page after 2 seconds
            setTimeout(() => {
              setVisible(false);
              window.location.reload();
            }, 1500);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      // console.log('Response:', response);
      // console.log('Response data:', response.data);
    } catch (error) {
      console.log("Error:", error);
      if (error.response) {
        console.log("Error response data:", error.response.data);
      }
    }
  };

  return (
    <div>
      <section className="h-screen mx-auto bg-neutral-700">
        <div className="h-full p-5 mx-auto mxcontainer">
          <div className="flex flex-wrap items-center justify-center h-full g-6 text-neutral-200">
            <div className="w-5/6 px-26">
              <div className="block bg-gray-900 rounded-lg shadow-lg">
                <div className="g-0 lg:flex lg:flex-wrap">
                <div className="absolute flex justify-center mx-auto">
                    <Link
                      to="/login"
                      style={{
                        padding: "20px 25px",
                        textDecoration: "none",
                        fontSize: "15px",
                        display: "inline-block",
                        color: "#e7e3e3",
                      }}
                    >
                      <IoArrowBackCircleSharp size={50} />
                    </Link>
                  </div>
                  {/* <!-- Left column container--> */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      {/* <!--Logo--> */}
                      <div className="text-center">
                        <img className="w-40 mx-auto" src={logo} alt="logo" />
                        <h2 className="pb-1 mt-1 mb-12 text-4xl font-semibold">
                          Team EcoSync
                        </h2>
                      </div>

                      <form>
                        {/* <!--Username input--> */}
                        <fieldset className="mb-4 space-y-1">
                          <div className="flex gap-2 pb-2">
                            <Label htmlFor="" className="text-md text-gray-1">
                              Provide your email address to reset password !
                            </Label>
                          </div>
                          <div className="relative">
                            <Input
                              placeholder="Enter Email Address"
                              className="p-3 text-gray-950"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </fieldset>

                        {/* <!--Submit button--> */}
                        <div className="pt-1 pb-1 mb-12 text-center">
                          <TERipple className="w-full">
                            <button
                              className="mb-3 inline-block w-full rounded p-4 pt-2.5 text-lg font-medium uppercase leading-normal text-white"
                              type="button"
                              style={{
                                background:
                                  "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                              }}
                              onClick={handleSubmit}
                            >
                              Submit
                            </button>
                          </TERipple>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* <!-- Right column container with background and description--> */}
                  <div
                    className="flex items-center justify-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                    style={{
                      backgroundImage: `url(${backgroundImage})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
              </div>
            </div>
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
