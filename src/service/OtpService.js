import axios from "./axiosConfig";
export const sendOtp = async (otpForm) => {
  try {
    const response = await axios.post("/author/sendOtp", otpForm);
    return response;
  } catch (error) {
    throw error;
  }
};
export const verifyOtp = async (verifyForm) => {
  try {
    const response = await axios.post("/author/verify", verifyForm);

    return response;
  } catch (error) {
    console.error("Axios Error:", error);
    throw error;
  }
};
