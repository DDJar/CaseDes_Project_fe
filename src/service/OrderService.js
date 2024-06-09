import axios from "./axiosConfig";

export const getOrderList = async () => {
  try {
    const response = await axios.get("/order");
    const orders = response.data;
    return orders;
  } catch (error) {
    throw error;
  }
};
