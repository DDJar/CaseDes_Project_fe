import axios from "./axiosConfig";
import Cookies from "js-cookie";
export const setAuthToken = ({ token, info, userId }) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  expirationDate.setHours(expirationDate.getHours() + 7);
  Cookies.set("token", JSON.stringify(token), {
    expires: expirationDate,
    httpOnly: true,
  });
  Cookies.set("userId", JSON.stringify(userId), {
    expires: expirationDate,
    httpOnly: true,
  });
  Cookies.set("info", JSON.stringify(info), {
    expires: expirationDate,
    httpOnly: true,
  });
};
export const logout = async () => {
  axios.get("/users/logout");
  Cookies.remove("token");
  Cookies.remove("userId");
  Cookies.remove("info");
  delete axios.defaults.headers.common["Authorization"];
  window.location.href = `/`;
};

export const postLogin = async (LoginDTO) => {
  try {
    const response = await axios.post("/users/login", LoginDTO);

    const { token, info, userId, isBlock } = response.data;
    if (isBlock === "Block") {
      return "Block";
    }
    setAuthToken({ token, info, userId });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return userId;
  } catch (error) {
    console.error("Axios Error:", error);
    throw error;
  }
};

export const postRegist = async (RegistDTO) => {
  try {
    const response = await axios.post("/users/register", RegistDTO);

    const { token, info, userId } = response.data;
    setAuthToken({ token, info, userId });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } catch (error) {
    console.error("Axios Error:", error);
    console.log("Error Response:", error.response?.data);
    throw error;
  }
};
export const resetPasswords = async (ResetForm) => {
  try {
    const response = await axios.put(
      "/users/reset-password/" + ResetForm.userId,
      ResetForm
    );
    return response;
  } catch (error) {
    console.error("Axios Error:", error);
    console.log("Error Response:", error.response?.data);
    throw error;
  }
};
export const initiateGoogleLogin = () => {
  window.location.href = `https://case-shop-be.onrender.com/auth/google`;
};
export const initiateFacebookLogin = () => {
  window.location.href = `https://case-shop-be.onrender.com/auth/facebook`;
};
