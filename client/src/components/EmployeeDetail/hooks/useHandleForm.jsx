import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateHiragana,
  validateRequiredField,
  validateTelephone,
} from "../helpers";
import { apiPostCall, apiPutCall } from "../../../utils/apiUtil";
import { showToast } from "../../../stores/toast/action";
import {
  ADD_EMPLOYEE_INFO_FAILURE_MESSAGE,
  ADD_EMPLOYEE_INFO_SUCCESS_TOAST_MESSAGE,
  UPDATE_EMPLOYEE_INFO_FAILURE_MESSAGE,
  UPDATE_EMPLOYEE_INFO_SUCCESS_TOAST_MESSAGE,
} from "../../../constants/messageConst";
import {
  LEVEL_ERROR,
  LEVEL_INFO,
  clearToast,
} from "../../../stores/toast/constants";
import { RETIRE_STATUS_ID } from "../../../constants/formConsts";
import { EMPLOYEE_LIST_ENDPOINT } from "../../../constants/apiUrlConst";
import { EMPLOYEE_LIST_PAGE } from "../../../constants/pagesUrlConst";

export const useHandleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({});

  const validateForm = (formValues) => {
    const newErrorMessage = {};

    // Validation check
    for (const name in formValues) {
      const fieldValue = formValues[name];
      const fieldValidators = {
        lastName: [validateRequiredField],
        firstName: [validateRequiredField],
        lastNameHiragana: [validateRequiredField, validateHiragana],
        firstNameHiragana: [validateRequiredField, validateHiragana],
        birthday: [validateRequiredField],
        telephone: [validateTelephone],
        mail: [validateRequiredField, validateEmail],
        enterDate: [validateRequiredField],
        retireDate:
          formValues.houseStatusId === RETIRE_STATUS_ID && !formValues[name]
            ? [validateRequiredField]
            : [],
      };
      const validators = fieldValidators[name];
      if (validators) {
        validators.forEach((validator) => {
          const errorMessage = validator(fieldValue);
          if (errorMessage) {
            newErrorMessage[name] = errorMessage;
          }
        });
      }
    }
    return newErrorMessage;
  };

  const sendData = async (data, isEdit) => {
    try {
      if (isEdit) {
        const response = await apiPutCall(
          `${EMPLOYEE_LIST_ENDPOINT}${data.employeeId}`,
          data
        );

        if (response.status === 200) {
          dispatch(
            showToast({
              open: true,
              message: UPDATE_EMPLOYEE_INFO_SUCCESS_TOAST_MESSAGE,
              statusCode: response.status,
              level: LEVEL_INFO,
            })
          );
        }
      } else {
        const response = await apiPostCall(EMPLOYEE_LIST_ENDPOINT, data);
        if (response.status === 200) {
          navigate(
            EMPLOYEE_LIST_PAGE,
            dispatch(
              showToast({
                open: true,
                message: ADD_EMPLOYEE_INFO_SUCCESS_TOAST_MESSAGE,
                statusCode: response.status,
                level: LEVEL_INFO,
              })
            )
          );
        }
      }
    } catch (error) {
      const statusCode = error.response ? error.response.status : undefined;
      dispatch(
        showToast({
          open: true,
          message: isEdit
            ? UPDATE_EMPLOYEE_INFO_FAILURE_MESSAGE
            : ADD_EMPLOYEE_INFO_FAILURE_MESSAGE,
          statusCode: statusCode,
          level: LEVEL_ERROR,
        })
      );
      clearToast(dispatch);
    }
  };

  const handleForm = async (formValues, isEdit) => {
    const newErrorMessage = validateForm(formValues);
    setErrorMessage(newErrorMessage);

    if (Object.keys(newErrorMessage).length === 0) {
      sendData(formValues, isEdit);
    }
  };

  return { errorMessage, handleForm };
};
