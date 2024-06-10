import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setAuthToken } from "../../service/loginService";
import { getUserById } from "../../service/UserService";
const AuthGG = () => {
  let { userId } = useParams();

  useEffect(() => {
    const userID = userId.split("$")[0];
    const token = userId.split("$")[1];
    const userData = getUserById(userID);
    const infoUser = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      imgAvt: userData.imgAvt,
    };
    setAuthToken({ token, infoUser, userID });
    window.location.href = "/";
  }, []);
};

export default AuthGG;
