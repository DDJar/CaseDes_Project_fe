import axios from "./axiosConfig";

export const GetCartOrder = async (userId) => {
  try {
    const response = await axios.get("/cartOrder", userId);
    const cartOrderData = response.data;
    return cartOrderData;
  } catch (error) {
    throw error;
  }
};
