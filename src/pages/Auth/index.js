import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setAuthToken } from "../../service/loginService";
import { getUserById } from "../../service/UserService";
import Cookies from "js-cookie";

const AuthGG = () => {
  let { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await getUserById(userId.split("$")[0].trim());
        setUserData(userDataResponse);
        const infoUser = {
          firstName: userDataResponse?.firstName || "",
          lastName: userDataResponse?.lastName || "",
          imgAvt: userDataResponse?.imgAvt || "",
        };
        setAuthToken({
          token: userId.split("$")[1].trim(),
          info: infoUser,
          userId: userId.split("$")[0].trim(),
        });
        window.location.href = `/`;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  return null;
};

export default AuthGG;
