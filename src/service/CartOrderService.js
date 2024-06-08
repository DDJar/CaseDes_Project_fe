import axios from "./axiosConfig";

export const GetCartOrder = async (userId) => {
    try {
        const response = await axios.get("/cartOrder", userId);
        const cartOrderData = response.data;
        console.log(cartOrderData);
        return cartOrderData;
    } catch (error) {
        throw error;
    }
}