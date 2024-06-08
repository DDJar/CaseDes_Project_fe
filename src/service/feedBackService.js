import axios from "./axiosConfig";
export const GetAllFeeback = async () => {
    try {
        const response = await axios.get("/feedback");
        const feedbackData = response.data;
        console.log(feedbackData)
        
        return feedbackData;
    } catch (error) {
        throw error;
    }
}
export const CreateFeeback = async (user,product,content) => {
    try {
        const body = {user,product,content};
        const response = await axios.post("/feedback",body);
        const feedbackData = response.data;
        console.log(feedbackData)
        
        return feedbackData;
    } catch (error) {
        throw error;
    }
}
export const EditFeeback = async (id,content) => {
    try {
        const body = {content};
        const response = await axios.put("/feedback/"+id,body);
        const feedbackData = response.data;
        console.log(feedbackData)
        
        return feedbackData;
    } catch (error) {
        throw error;
    }
}
export const DeleteFeeback = async (id) => {
    try {
        const response = await axios.delete("/feedback/"+id);
        const feedbackData = response.data;
        console.log(feedbackData)
        
        return feedbackData;
    } catch (error) {
        throw error;
    }
}