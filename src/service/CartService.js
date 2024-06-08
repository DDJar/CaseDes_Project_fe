import axios from "./axiosConfig";

export const AddItemToCart = async (productId, quantity, userId, totalPrice, status) => {
    try {
        const response = await axios.post("/cart", {productId, quantity, userId, totalPrice, status});
        const products = response.data;
        console.log(response);
        return products;
    } catch (error) {
        throw error;
    }
}

export const GetCart = async (userId) => {
    try {
        const response = await axios.get("/cart", userId);
        const cartData = response.data;
        console.log(cartData);
        return cartData;
    } catch (error) {
        throw error;
    }
}
export const GetListProductOnCard = async () => {
    try {
        const response = await axios.get("/cart");
        const cartData = response.data;
        console.log(cartData);
        return cartData;
    } catch (error) {
        throw error;
    }
}

export const CreateCartOrder = async (userId, cartItems, totalPrice) => {
    try {
        const body = {userId, cartItems, totalPrice};
        console.log(body);
        const response = await axios.post("/cartOrder", body);
        const products = response.data;
        console.log(response);
        return products;
    } catch (error) {
        throw error;
    }
}