import axios from "axios";
import Cookies from "js-cookie";

// Hàm để lấy thời gian hết hạn của một cookie từ tên cookie
const getCookieExpiration = (cookieName) => {
  const cookieValue = Cookies.get(cookieName);
  if (cookieValue) {
    try {
      const cookieObj = JSON.parse(cookieValue);
      if (cookieObj && cookieObj.expires) {
        return new Date(cookieObj.expires);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error parsing cookie value:", error);
      return null;
    }
  }
  return null;
};

const instance = axios.create({
  baseURL: "https://case-shop-be.onrender.com",
});

instance.interceptors.request.use((config) => {
  // Initialize headers if not already present
  config.headers = config.headers || {};

  // Lấy token từ cookie
  const authToken1 = Cookies.get("token");

  // Kiểm tra xem token có tồn tại hay không
  if (authToken1) {
    const authToken = JSON.parse(authToken1);
    // Nếu tồn tại, thêm token vào header
    config.headers["Authorization"] = `Bearer ${authToken}`;

    // Lấy thời gian hết hạn của token từ cookie
    const tokenExpiration = getCookieExpiration("token");

    // Kiểm tra xem thời gian hết hạn của token có tồn tại và token đã hết hạn hay chưa
    if (tokenExpiration && tokenExpiration < new Date()) {
      window.location.href = `/login`;
    }
  } else {
    // Nếu không tồn tại, bạn có thể thực hiện xử lý khác, hoặc không thêm token vào header
    console.warn("Token is missing. Do something...");
  }

  return config;
});

export default instance;
