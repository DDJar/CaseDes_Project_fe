import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setAuthToken } from "../../service/loginService";
import { getUserById } from "../../service/UserService";

const AuthGG = () => {
  let { userId } = useParams();
  const [userData, setUserData] = useState(null);

  const userID = userId.split("$")[0].trim();
  const token = userId.split("$")[1].trim();

  try {
    const userDataResponse = getUserById(userID);
    setUserData(userDataResponse);
    const infoUser = {
      firstName: userDataResponse?.firstName || "",
      lastName: userDataResponse?.lastName || "",
      imgAvt: userDataResponse?.imgAvt || "",
    };
    console.log(userID);
    console.log(token);
    console.log(infoUser);
    setAuthToken({ token, infoUser, userID });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  return null;
};

export default AuthGG;
