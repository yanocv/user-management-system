import React, { useState } from "react";
import styles from "./Register.module.scss";
import { showToast } from "../stores/toast/action";
import { LEVEL_ERROR, LEVEL_INFO, clearToast } from "../stores/toast/constants";
import { useDispatch } from "react-redux";
import { apiPostCall } from "../utils/apiUtil";
import {
  PASSWORD_CONFIRMATION_REQUIRED_MESSAGE,
  PASSWORD_FORMAT_MESSAGE,
  PASSWORD_LENGTH_REQUIREMENT_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
  REGISTRATION_FAILURE_TOAST_MESSAGE,
  REGISTRATION_SUCCESS_TOAST_MESSAGE,
  USERNAME_ALREADY_EXISTS_TOAST_MESSAGE,
  USERNAME_FORMAT_MESSAGE,
  USERNAME_LENGTH_REQUIREMENT_MESSAGE,
} from "../constants/messageConst";
import { InputField } from "../components/common/InputField";
import Button from "../components/common/Button";
import { REGISTER_ENDPOINT } from "../constants/apiUrlConst";

export const Register = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const asciiCharactersRegex = /^.{8,32}$/;
  const japaneseCharactersRegex = /[^\u0020-\u007E]/;

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
    {
      id: "passwordConfirm",
      placeholder: "パスワード確認",
      type: "password",
      required: true,
      onEvent: (e) => setPwdConfirm(e.target.value),
    },
  ];

  const data = {
    create: {
      username: user,
      password: pwd,
    },
  };

  // Check if username and password are empty
  function checkInput(event) {
    event.preventDefault();
    let errors = [];

    if (!asciiCharactersRegex.test(user)) {
      errors.push(USERNAME_LENGTH_REQUIREMENT_MESSAGE);
    }
    if (japaneseCharactersRegex.test(user)) {
      errors.push(USERNAME_FORMAT_MESSAGE);
    }

    if (!asciiCharactersRegex.test(pwd)) {
      errors.push(PASSWORD_LENGTH_REQUIREMENT_MESSAGE);
    }

    if (japaneseCharactersRegex.test(pwd)) {
      errors.push(PASSWORD_FORMAT_MESSAGE);
    }

    if (!pwdConfirm) {
      errors.push(PASSWORD_CONFIRMATION_REQUIRED_MESSAGE);
    } else if (pwd !== pwdConfirm) {
      errors.push(PASSWORD_MISMATCH_MESSAGE);
    }

    if (errors.length > 0) {
      setErrMsg(errors.join(`\n`));
      return;
    }
    setErrMsg("");

    const sendData = async () => {
      try {
        const response = await apiPostCall(REGISTER_ENDPOINT, data);
        if (response.status === 200) {
          dispatch(
            showToast({
              open: true,
              message: REGISTRATION_SUCCESS_TOAST_MESSAGE,
              statusCode: response.status,
              level: LEVEL_INFO,
            })
          );
          clearToast(dispatch);
          setUser("");
          setPwd("");
          setPwdConfirm("");
          event.target.form.reset();
        }
      } catch (error) {
        if (error.response.status === 409) {
          dispatch(
            showToast({
              open: true,
              message: USERNAME_ALREADY_EXISTS_TOAST_MESSAGE,
              statusCode: error.response.status,
              level: LEVEL_ERROR,
            })
          );
          dispatch(
            showToast({
              open: false,
            })
          );
        } else {
          dispatch(
            showToast({
              open: true,
              message: REGISTRATION_FAILURE_TOAST_MESSAGE,
              statusCode: error.response.status,
              level: LEVEL_ERROR,
            })
          );
          clearToast(dispatch);
        }
      }
    };
    sendData();
  }

  return (
    <div className="row flex-nowrap m-0 d-flex justify-content-center align-items-center">
      <form
        className={`needs-validation col p-0 mt-2 ${styles.register}`}
        noValidate
      >
        <div className="page-header pt-3 text-center d-flex flex-column mb-5">
          <h1 className="m-0">ユーザー登録</h1>
          <hr
            className={`m-0 opacity-100 border border-primary ${styles.horizontalRule}`}
          />
        </div>

        {anchors.map((anchor) => {
          return <InputField key={anchor.id} anchor={anchor} />;
        })}

        <pre className="text-danger text-center fw-bold">
          <strong>{errMsg}</strong>
        </pre>

        <Button type="submit" onClick={checkInput} label="登録" />
      </form>
    </div>
  );
};
