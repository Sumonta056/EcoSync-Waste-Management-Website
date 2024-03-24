import { TERipple } from "tw-elements-react";
import logo from "../Home/Images/logo.png";
import { Envelope, Lock } from "phosphor-react";
import { Icon, Input, Label } from "keep-react";
import backgroundImage from "./login.jpg";
import { useNavigate } from "react-router-dom";

export default function ExampleV2() {
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <section className="h-screen mx-auto bg-neutral-700">
      <div className="h-full p-5 mx-auto mxcontainer">
        <div className="flex flex-wrap items-center justify-center h-full g-6 text-neutral-800 dark:text-neutral-200">
          <div className="w-5/6 px-26">
            <div className="block bg-gray-900 rounded-lg shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
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
                          <Label htmlFor="" className="text-lg">
                            Email Address
                          </Label>
                        </div>
                        <div className="relative">
                          <Input
                            placeholder="Enter Email Address"
                            className="p-3 text-gray-950"
                          />
                        </div>
                      </fieldset>

                      {/* <!--Password input--> */}
                      <fieldset className="mb-4 space-y-1">
                        <div className="flex gap-2 pb-2">
                          <Label htmlFor="" className="text-lg">
                            Password
                          </Label>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            placeholder="Enter password"
                            type="password"
                            className="p-3 text-gray-950"
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
                            onClick={handleLogin}
                          >
                            Login
                          </button>
                        </TERipple>

                        {/* <!--Forgot password link--> */}
                        <a href="#!">Forgot password?</a>
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
  );
}
