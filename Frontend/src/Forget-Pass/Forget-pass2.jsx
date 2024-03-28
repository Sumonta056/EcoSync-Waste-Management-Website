import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Modal } from "antd";

export default function ForgetPass2() {
  const [visible, setVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const location = useLocation();
  const { email, OTP } = location.state;
  const navigate = useNavigate();
  const [timerCount, setTimer] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  console.log(email, OTP);

  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:3000/auth/reset-password/initiate", {
        OTP,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has succesfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === OTP) {
      console.log(OTP);
      setModalText("OTP match successful, now you can change your password");
      setVisible(true);
      setTimeout(() => {
        navigate("/auth/change-password", { state: { email } });
      }, 2000);
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-neutral-700">
      <div className="absolute flex left-84 top-28">
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
      <div className="w-full max-w-xl px-6 pt-10 mx-auto bg-gray-800 shadow-xl pb-9 rounded-2xl">
        <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="text-3xl font-semibold text-gray-300">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between w-full max-w-xs mx-auto">
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          e.target.value,
                          OTPinput[1],
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          e.target.value,
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          e.target.value,
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      maxLength="1"
                      className="flex flex-col items-center justify-center w-full h-full px-5 text-lg text-center bg-white border border-gray-200 outline-none rounded-xl focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          OTPinput[2],
                          e.target.value,
                        ])
                      }
                    ></input>
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <a
                      onClick={() => verfiyOTP()}
                      className="flex flex-row items-center justify-center w-full py-5 text-sm text-center text-white bg-blue-700 border border-none shadow-sm outline-none cursor-pointer rounded-xl"
                    >
                      Verify Account
                    </a>
                  </div>

                  <div className="flex flex-row items-center justify-center space-x-1 text-sm font-medium text-center text-gray-500">
                    <p>Didn&apos;t recieve code?</p>{" "}
                    <a
                      className="flex flex-row items-center"
                      style={{
                        color: disable ? "gray" : "blue",
                        cursor: disable ? "none" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                      }}
                      onClick={() => resendOTP()}
                    >
                      {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
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
