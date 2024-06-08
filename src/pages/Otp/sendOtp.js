import React, { useState } from "react";
import { sendOtp } from "../../service/OtpService";

const SendOTP = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState("");
  const handleSendCode = async () => {
    try {
      const otpForm = {
        emailOrPhone: emailOrPhone,
      };
      const response = await sendOtp(otpForm);
      window.localStorage.setItem("inputType", response.data.emailOrPhone);
      window.location.href = `/verify-otp`;
    } catch (error) {
      console.error(error);
      setError("Error sending verification code");
    }
  };

  return (
    <div>
      <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Send OTP
              </h1>
              <h2 className="text-danger"> {error && <p>{error}</p>}</h2>
            </div>

            <div className="mt-5">
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      aria-describedby="email-error"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                    />
                  </div>
                  <p
                    className="hidden text-xs text-red-600 mt-2"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  onClick={handleSendCode}
                >
                  Send Verification Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SendOTP;
