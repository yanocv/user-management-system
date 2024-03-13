import React, { useState } from "react";
import styles from "./Login.module.scss";
import { useDispatch } from "react-redux";
import { login } from "../stores/actions/authActions";
import {
  ENTER_PASSWORD,
  ENTER_USERNAME,
  ENTER_USERNAME_PASSWORD,
  INVALID_CREDENTIALS,
} from "../constants/messageConst";
import { InputField } from "../components/common/InputField";
import { apiPostCall } from "../utils/apiUtil";
import Button from "../components/common/Button";
import userEnv from "userEnv";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants/tokenConst";
import { AUTH_ENDPOINT } from "../constants/apiUrlConst";

export const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const anchors = [
    {
      id: "user",
      placeholder: "ユーザー名",
      type: "text",
      required: true,
      onEvent: (e) => setUser(e.target.value),
    },
    {
      id: "password",
      placeholder: "パスワード",
      type: "password",
      required: true,
      onEvent: (e) => setPwd(e.target.value),
    },
  ];

  // Check if username and password are empty
  function checkInput(event) {
    event.preventDefault();

    if (!user && !pwd) {
      setErrMsg(ENTER_USERNAME_PASSWORD);
      return;
    }
    if (!user) {
      setErrMsg(ENTER_USERNAME);
      return;
    }
    if (!pwd) {
      setErrMsg(ENTER_PASSWORD);
      return;
    } else {
      const sendData = async () => {
        try {
          const response = await apiPostCall(AUTH_ENDPOINT, {
            username: user,
            password: pwd,
            applicationId: userEnv.applicationId,
          });
          if (response.status === 200) {
            const refresh_token = response.data.refresh_token;
            const access_token = response.data.access_token;
            localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
            localStorage.setItem(ACCESS_TOKEN_KEY, access_token);

            dispatch(login());
          }
        } catch (error) {
          console.log(error);
          // Other errors are handled by the interceptor
          if (error.response && error.response.status === 404) {
            setErrMsg(INVALID_CREDENTIALS);
          }
        }
      };
      sendData();
    }
  }
  return (
    <div
      className={`d-flex p-2 justify-content-center w-100 center-form ${styles.formContainer}`}
    >
      <form className={`needs-validation ${styles.login}`} noValidate>
        <h3 className="text-center m-0">社員管理システム</h3>

        {anchors.map((anchor) => {
          return <InputField key={anchor.id} anchor={anchor} />;
        })}

        <strong
          className={`text-danger text-center d-block pb-3 ${styles.errorMessage}`}
        >
          {errMsg}
        </strong>

        <Button label="ログイン" onClick={checkInput} type="submit" />
      </form>
    </div>
  );
};
