import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setAuthToken } from "../../service/loginService";
import { getUserById } from "../../service/UserService";
import Cookies from "js-cookie";

const AuthGG = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const userIdParts = userId.split("$");
          const userID = userIdParts[0]?.trim();
          const token = userIdParts[1]?.trim();
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 7);
          expirationDate.setHours(expirationDate.getHours() + 7);
          Cookies.set("token", JSON.stringify(token), {
            expires: expirationDate,
          });
          Cookies.set("userId", JSON.stringify(userID), {
            expires: expirationDate,
          });

          const userDataResponse = await getUserById(userID);
          setUserData(userDataResponse);
          const infoUser = {
            firstName: userDataResponse?.firstName || "",
            lastName: userDataResponse?.lastName || "",
            imgAvt: userDataResponse?.imgAvt || "",
          };
          Cookies.set("info", JSON.stringify(infoUser), {
            expires: expirationDate,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  return null;
};

export default AuthGG;
