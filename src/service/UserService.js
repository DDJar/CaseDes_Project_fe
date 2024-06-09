import axios from "./axiosConfig";
export const getAllUser = async () => {
  try {
    const response = await axios.get("/users");
    const userIfor = response.data;
    return userIfor;
  } catch (error) {
    return error.response.status;
  }
};
export const getAllRole = async () => {
  try {
    const response = await axios.get("/users/role");
    const roleInfo = response.data;
    return roleInfo;
  } catch (error) {
    return error.response.status;
  }
};
export const getUserById = async (userId) => {
  try {
    const response = await axios.get("/user-detail/" + userId);
    const userIfor = response.data.user;
    return userIfor;
  } catch (error) {
    throw error;
  }
};
export const updateUserById = async (userId, userUpdate) => {
  try {
    const response = await axios.put("/user-detail/" + userId, userUpdate);
    const userIfor = response.data;
    return userIfor;
  } catch (error) {
    throw error;
  }
};
export const updateUserPasswordById = async (userId, userUpdate) => {
  try {
    const response = await axios.put(
      "/user-detail/change-password/" + userId,
      userUpdate
    );
    const userIfor = response.data;
    return userIfor;
  } catch (error) {
    throw error;
  }
};
export const updateAvatar = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("imageFile", imageFile);
    const response = await axios.post(`/imageUpload`, formData);
    return response.data.image;
  } catch (error) {
    throw error;
  }
};
export const CreateUser = async (FormDataCreate) => {
  try {
    const response = await axios.post("/users/create-user", FormDataCreate);
    return response.data;
  } catch (error) {
    throw error;
  }
};
