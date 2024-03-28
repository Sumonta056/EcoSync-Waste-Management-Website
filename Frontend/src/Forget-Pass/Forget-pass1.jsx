import React, { useState } from 'react';
import { TERipple } from "tw-elements-react";
import logo from "../Home/Images/logo.png";
import { Input, Label } from "keep-react";
import backgroundImage from "./login.jpg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ForgetPass2 from './Forget-pass2';
export const EmailOTPContext = React.createContext();


export default function ForgetPass1() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(`Email submitted: ${email}`);
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        // console.log(newOTP);
        
        try {
          const response = await axios.post("http://localhost:3000/auth/reset-password/initiate", {
            OTP, // use newOTP
            recipient_email: email,
          }).then((response) => {
            navigate('/auth/reset-password/confirm', { state: { email, OTP } });
          })
          // console.log('Response:', response);
          // console.log('Response data:', response.data);
        } catch (error) {
          console.log('Error:', error);
          if (error.response) {
            console.log('Error response data:', error.response.data);
          }
        }
      }

    return (

        <div>
          <section className="h-screen mx-auto bg-neutral-700">
            <div className="h-full p-5 mx-auto mxcontainer">
              <div className="flex flex-wrap items-center justify-center h-full g-6 text-neutral-200">
                <div className="w-5/6 px-26">
                  <div className="block bg-gray-900 rounded-lg shadow-lg">
                    <div className="g-0 lg:flex lg:flex-wrap">
                      {/* <!-- Left column container--> */}
                      <div className="px-4 md:px-0 lg:w-6/12">
                        <div className="md:mx-6 md:p-12">
                          {/* <!--Logo--> */}
                          <div className="text-center">
                            <img
                              className="w-40 mx-auto"
                              src={logo}
                              alt="logo"
                            />
                            <h2 className="pb-1 mt-1 mb-12 text-4xl font-semibold">
                              Team EcoSync
                            </h2>
                          </div>

                          <form>
                            {/* <!--Username input--> */}
                            <fieldset className="mb-4 space-y-1">
                              <div className="flex gap-2 pb-2">
                                <Label
                                  htmlFor=""
                                  className="text-lg text-gray-1"
                                >
                                  Email Address
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

        </div>

    );
}
