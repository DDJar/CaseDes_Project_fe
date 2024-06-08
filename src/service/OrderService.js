
import axios from "./axiosConfig";

export const getOrderList = async () => {
    try {
      const response = await axios.get("/order");
      const orders = response.data;
      console.log("Order List", orders);
      return orders;
    } catch (error) {
      throw error;
    }
};