import React, { useState } from 'react';
import { verifyOtp ,sendOtp} from '../../service/OtpService';

const VerifyOTP = () => {
  const [error, setError] = useState("");
  const [otpInputs, setOtpInputs] = useState(['', '', '', '', '', '']);
  const handleSendCode = async () => {
    try {
      const otpForm = {
        emailOrPhone: window.localStorage.getItem('inputType')
      }
      const response = await sendOtp(otpForm);
      console.log(response.data.emailOrPhone)
    } catch (error) {
      console.error(error);
      setError('Error sending verification code');
    }
  };
  const handleVerifyOTP = async () => {
    try {
      const verifyForm = {
        emailOrPhone: window.localStorage.getItem('inputType'),
        otp: otpInputs.join('')
      }
      const response = await verifyOtp(verifyForm);
      if (response.data.success) {
        window.location.href =response.data.redirectUrl;
        console.log(response)
      }
    } catch (error) {
      console.error(error);
      setError('Error verifying OTP');
    }
  };
  const handleInputChange = (index, value) => {
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    if (index < otpInputs.length - 1 && value.length === 1) {
      const nextIndex = index + 1;
      document.getElementById(`otpInput-${nextIndex}`).focus();
    }
    setOtpInputs(newOtpInputs);
  };

  return (
    <div>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Verification OTP</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col space-y-16">
                {error && <p>{error}</p>}
                <div className="flex flex-row items-center justify-between ">
                  {otpInputs.map((value, index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                       id={`otpInput-${index}`}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button onClick={handleVerifyOTP} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                      Send Verification OTP
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p> <a className="flex flex-row items-center text-blue-600"  target="_blank" rel="noopener noreferrer" onClick={handleSendCode}>Resend</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
