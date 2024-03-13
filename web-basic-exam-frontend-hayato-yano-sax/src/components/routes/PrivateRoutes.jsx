import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { login } from "../../stores/actions/authActions";
import axiosInstance from "../../api/axios";
import { ACCESS_TOKEN_KEY } from "../../constants/tokenConst";
import { LOGIN_PAGE } from "../../constants/pagesUrlConst";
import { AUTH_ENDPOINT } from "../../constants/apiUrlConst";

export const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // For security reasons, we need to check if the token is still valid when the user refreshes the page
  // We could use `localStorage` to store the login state, but it is not secure
  useEffect(() => {
    const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!access_token) {
      navigate(LOGIN_PAGE);
      return;
    }

    // Send a request to the server to check if the token is still valid
    axiosInstance
      .get(AUTH_ENDPOINT)
      .then(() => {
        dispatch(login());
      })
      .catch((error) => {
        // If the token is not valid, redirect the user to the login page and clear the local storage
        navigate(LOGIN_PAGE);
        localStorage.clear();
        return Promise.reject(error);
      });
  }, [dispatch, navigate]);

  if (isLoggedIn === undefined) {
    return null;
  } else {
    if (isLoggedIn) {
      return <Outlet />;
    } else {
      // Set to null to prevent the user from seeing the login page for a split second, and when refreshing the page
      return null;
    }
  }
};
