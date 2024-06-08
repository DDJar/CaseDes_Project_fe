import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import {
  postLogin,
  initiateGoogleLogin,
  initiateFacebookLogin,
} from "../../service/loginService";
import Cookies from "js-cookie";
// Functional Component with Props
const Login = (props) => {
  const [userLogin, setUserLogin] = useState({
    emailOrPhone: "",
    passwords: "",
  });
  const [error, setError] = useState("");
  const [viewPass, setviewPass] = useState(true);
  useEffect(() => {
    const storedCookie = Cookies.get("info");
    const messageCookie = Cookies.get("message");
    if (storedCookie) {
      window.location.href = `/`;
    }
    if (messageCookie) {
      const messageC = JSON.parse(messageCookie);
      setError(messageC);
    }
  }, []);
  const handViewPass = () => {
    setviewPass(!viewPass);
  };
  const validation = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\d{10}$/.test(value);
  };
  const onSubmitLogin = async () => {
    try {
      Cookies.remove("message");
      if (userLogin.emailOrPhone !== "" && userLogin.passwords !== "") {
        if (!validation(userLogin.emailOrPhone)) {
          setError("Invalid email or phone format.");
          return;
        }
        let res = await postLogin(userLogin);
        if (res === "Block") {
          setError("Your account are Block.");
        } else {
          window.location.href = `/`;
        }
      } else {
        setError("Email/Phone and password are required.");
      }
    } catch (error) {
      setError("Email/Phone and password are wrong.");
      console.error("Axios Error:", error);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      initiateGoogleLogin();
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
            <h3 className="text-3xl font-bold text-white">Sign in</h3>

            <p className="text-sm mt-4 text-white">
              Embark on a seamless journey as you sign in to your account.
              Unlock a realm of opportunities and possibilities that await you.
            </p>
          </div>
        </div>
        <div className="bg-white my-4 rounded-xl sm:px-6 px-4 py-8 max-w-md w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto">
          <form>
            <div className="mb-10">
              <h3 className="text-3xl font-extrabold">Sign in</h3>
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
                Sign in with Google
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
            <div>
              <label className="text-sm mb-2 block">
                {" "}
                Email Or PhoneNumber
              </label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  onChange={(e) =>
                    setUserLogin({
                      ...userLogin,
                      emailOrPhone: e.target.value,
                    })
                  }
                  value={userLogin.emailOrPhone}
                  type="text"
                  required
                  className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter email or phoneNumber"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="mt-6">
              <label className="text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input
                  value={userLogin.passwords}
                  onChange={(e) =>
                    setUserLogin({ ...userLogin, passwords: e.target.value })
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
              </div>
            </div>
            <div className="mt-4 text-right">
              <a
                href="/send-otp"
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <div className="mt-10">
              <button
                onClick={onSubmitLogin}
                type="button"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Log in
              </button>
            </div>
            <p className="text-sm mt-6 text-center">
              Don't have an account{" "}
              <a
                href="/register"
                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
