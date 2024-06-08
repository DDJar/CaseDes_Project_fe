import React, { useState } from "react";
import {
  postRegist,
  initiateGoogleLogin,
  initiateFacebookLogin,
} from "../../service/loginService";
import Button from "../../components/Button";

// Functional Component with Props
const Register = (props) => {
  const [userRegiste, setUserRegist] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passwords: "",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passwords: "",
    confirmPassword: " ",
  });

  const [confiromPass, setConfiromPass] = useState("");
  const [viewPass, setviewPass] = useState(true);
  const handViewPass = () => {
    setviewPass(!viewPass);
  };
  const [viewCPass, setviewCPass] = useState(true);
  const handCViewPass = () => {
    setviewCPass(!viewCPass);
  };
  const [option, setOption] = useState("0");
  const handOption = () => {
    if (option === "0") {
      setUserRegist({ ...userRegiste, email: "" });
      setOption("1");
    } else {
      setUserRegist({ ...userRegiste, phone: "" });
      setOption("0");
    }
  };
  const registerSubmit = async () => {
    try {
      const emptyFields = Object.keys(userRegiste).filter(
        (field) => field !== "phone" && field !== "email" && !userRegiste[field]
      );
      if (
        (userRegiste.phone || userRegiste.email) &&
        emptyFields.length === 0
      ) {
        if (userRegiste.passwords === confiromPass) {
          if (errors) {
            let res;
            console.log(userRegiste);
            try {
              res = await postRegist(userRegiste);
              window.location.href = `/`;
            } catch (error1) {
              if (
                error1.response &&
                error1.response.data &&
                error1.response.data.error
              ) {
                setError(error1.response.data.error);
              } else {
                setError(error1);
              }
            }
          } else {
            setError("You miss some detail");
          }
        } else {
          setError("Password confirmation is not the same");
        }
      } else {
        setError("Please fill in all required fields (except phone or email)");
      }
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const data = initiateGoogleLogin();
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };
  const handleFaceBookLogin = async () => {
    try {
      initiateFacebookLogin();
    } catch (error) {
      console.error("Facebook Login Error:", error);
    }
  };

  const validation = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\d{10}$/.test(value);
  };
  const handleInputChange = (field, value) => {
    setUserRegist({ ...userRegiste, [field]: value });

    // Validation logic
    switch (field) {
      case "firstName":
        setErrors({
          ...errors,
          firstName: value ? "" : "First name is required",
        });
        break;
      case "lastName":
        setErrors({
          ...errors,
          lastName: value ? "" : "Last name is required",
        });
        break;
      case "email":
        setErrors({
          ...errors,
          email: validation(value) ? "" : "Invalid email address",
        });
        break;
      case "phone":
        setErrors({
          ...errors,
          phone: validation(value) ? "" : "Invalid phone number",
        });
        break;
      case "passwords":
        setErrors({
          ...errors,
          passwords:
            value.length >= 6 ? "" : "Password must be at least 6 characters",
        });
        break;
      default:
        break;
    }
  };
  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="grid lg:grid-cols-2 gap-4 bg-gradient-to-r from-blue-500 to-blue-700 sm:p-8 p-4 h-[320px]">
        <div>
          <Button
            to="/"
            className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl"
          >
            CASEDES
          </Button>
          <div className="max-w-lg mt-16 px-6 max-lg:hidden">
            <h3 className="text-3xl font-bold text-white">Regist</h3>
            <p className="text-sm mt-4 text-white">
              Embark on a seamless journey as you Regist to your account. Unlock
              a realm of opportunities and possibilities that await you.
            </p>
          </div>
        </div>
        <div className="bg-white my-4 rounded-xl sm:px-6 px-4 py-8 max-w-md w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto">
          <form>
            <div className="mb-10">
              <h3 className="text-3xl font-extrabold">Regist</h3>
              <h4 className="text-red-500 font-extrabold">{error}</h4>
            </div>
            <div className="sm:flex sm:items-start space-x-4 max-sm:space-y-4 mb-10">
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="py-2.5 px-4 text-sm font-semibold rounded text-blue-500 bg-blue-100 hover:bg-blue-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  className="inline mr-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    data-original="#fbbd00"
                  />
                  <path
                    fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    data-original="#0f9d58"
                  />
                  <path
                    fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    data-original="#31aa52"
                  />
                  <path
                    fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    data-original="#3c79e6"
                  />
                  <path
                    fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    data-original="#cf2d48"
                  />
                  <path
                    fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    data-original="#eb4132"
                  />
                </svg>
                Regist with Google
              </button>
              <button
                onClick={handleFaceBookLogin}
                type="button"
                className="py-2.5 px-4 text-sm font-semibold rounded text-blue-500 bg-blue-100 hover:bg-blue-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  fill="#007bff"
                  viewBox="0 0 167.657 167.657"
                >
                  <path
                    d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                    data-original="#010002"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                className="py-2.5 px-4 text-sm font-semibold rounded text-blue-500 bg-blue-100 hover:bg-blue-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  fill="#000"
                  viewBox="0 0 22.773 22.773"
                >
                  <path
                    d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="mb-3">
              <label className="text-sm mb-2 block">First Name</label>
              <div className="relative flex items-center">
                <input
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  value={userRegiste.firstName}
                  name="firstName"
                  type="text"
                  required
                  className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter first name"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <span className="text-red-500 text-xs">{errors.firstName}</span>
            </div>
            <div className="mb-3">
              <label className="text-sm mb-2 block">Last Name</label>
              <div className="relative flex items-center">
                <input
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  value={userRegiste.lastName}
                  name="lastName"
                  type="text"
                  required
                  className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter last name"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <span className="text-red-500 text-xs">{errors.lastName}</span>
            </div>
            <div>
              <div className="mt-3 mb-3 flex">
                <div className="col-span-2 mr-3">
                  <input
                    type="radio"
                    checked={option === "0" ? true : false}
                    id="idEmail"
                    onChange={handOption}
                  />{" "}
                  <label htmlFor="idEmail">Email</label>
                </div>
                <div className="col-span-4">
                  <input
                    type="radio"
                    checked={option === "1" ? true : false}
                    id="idPhone"
                    onChange={handOption}
                  />{" "}
                  <label htmlFor="idPhone">Phone</label>
                </div>
              </div>
              {option ? (
                <div>
                  <label className="text-sm mb-2 block">Email</label>
                  <div className="relative flex items-center">
                    <input
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      value={userRegiste.email}
                      name="email"
                      type="email"
                      required
                      className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      placeholder="Enter user name"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <span className="text-red-500 text-xs">{errors.email}</span>
                </div>
              ) : (
                <div>
                  <div>
                    <label className="text-sm mb-2 block">Phone</label>
                    <div className="relative flex items-center">
                      <input
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        value={userRegiste.phone}
                        name="phone"
                        type="number"
                        required
                        className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        placeholder="Enter user name"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                        />
                      </svg>
                    </div>
                    <span className="text-red-500 text-xs">{errors.phone}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6">
              <label className="text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  value={userRegiste.passwords}
                  onChange={(e) =>
                    handleInputChange("passwords", e.target.value)
                  }
                  name="password"
                  type={viewPass ? `password` : `text`}
                  required
                  className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter password"
                />
                {viewPass ? (
                  <svg
                    onClick={() => handViewPass(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    onClick={() => handViewPass(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                )}
                <span className="text-red-500 text-xs">{errors.passwords}</span>
              </div>
            </div>
            <div className="mt-6">
              <label className="text-sm mb-2 block">Confirom Password</label>
              <div className="relative flex items-center">
                <input
                  value={confiromPass}
                  onChange={(e) => setConfiromPass(e.target.value)}
                  name="password"
                  type={viewCPass ? `password` : `text`}
                  required
                  className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter password"
                />
                {viewCPass ? (
                  <svg
                    onClick={() => handCViewPass(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    onClick={() => handCViewPass(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
            <div className="mt-10">
              <button
                onClick={registerSubmit}
                type="button"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Register
              </button>
            </div>
            <p className="text-sm mt-6 text-center">
              Have an account{" "}
              <a
                href="/login"
                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
