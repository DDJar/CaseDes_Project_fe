import axios from "./axiosConfig";
export const create_payment = async (userDetail,bankCode)=>{
    try {
        const response = await axios.post("/order/create_payment_url", { userDetail, bankCode })
        return response;
      } catch (error) {
        throw error;
      }
} 