import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setAuthToken } from "../../service/loginService";
import { getUserById } from "../../service/UserService";

const AuthGG = () => {
  let { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userID = userId.split("$")[0].trim;
    const token = userId.split("$")[1].trim;
    console.log(userID);
    console.log(token);

    const fetchData = async () => {
      try {
        const userDataResponse = await getUserById(userID.trim);
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
  }, [userId, userData]);

  return null; // or loading component
};

export default AuthGG;
