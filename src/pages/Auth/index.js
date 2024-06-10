import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setAuthToken } from "../../service/loginService";
import { getUserById } from "../../service/UserService";

const AuthGG = () => {
  let { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userID = userId.split("$")[0];
    const token = userId.split("$")[1];
    console.log(userID);
    console.log(token);

    const fetchData = async () => {
      try {
        const userDataResponse = await getUserById(userID);
        setUserData(userDataResponse);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();

    const infoUser = {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      imgAvt: userData?.imgAvt || "",
    };

    setAuthToken({ token, infoUser, userID });
    window.location.href = "/";
  }, [userId, userData]);

  return null; // or loading component
};

export default AuthGG;
