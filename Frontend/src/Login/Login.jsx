import { TERipple } from "tw-elements-react";
import logo from "../Home/Images/logo.png";
import { Envelope, Lock } from "phosphor-react";
import { Icon, Input, Label } from "keep-react";
import backgroundImage from "./login.jpg";

export default function ExampleV2() {
  return (
    <section className="h-screen mx-auto bg-neutral-700">
      <div className="h-full p-5 mx-auto mxcontainer">
        <div className="flex flex-wrap items-center justify-center h-full g-6 text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg shadow-lg bg-slate-800">
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
                          <Icon>
                            <Envelope size={30} color="#AFBACA" />
                          </Icon>
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
                          <Icon>
                            <Lock size={30} color="#AFBACA" />
                          </Icon>
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
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded p-4 pt-2.5 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Log in
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
