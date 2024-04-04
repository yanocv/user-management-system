import {
  INVALID_TELEPHONE_CHARACTERS,
  INVALID_EMAIL,
  REQUIRED,
  INVALID_TELEPHONE_NUMBER,
  INVALID_HIRAGANA,
} from "../../constants/messageConst";
import { apiGetCall } from "../../utils/apiUtil";

export const convertToValuesArray = async (endpoint, fieldName) => {
  try {
    const response = await apiGetCall(endpoint);
    const dataResult = response.data.result;

    // Map the data to include both ID and name
    const mappedData = dataResult.map((item) => {
      if (fieldName === "company") {
        return {
          id: item.id,
          name: `${item.name}（${item.abbreviation}）`,
        };
      } else if (fieldName === "department") {
        return {
          id: item.id,
          name: item.name,
        };
      } else if (fieldName === "house-status") {
        return {
          id: item.id,
          name: item.label,
        };
      } else {
        return {
          id: "",
          name: "",
        };
      }
    });
    return mappedData;
  } catch (error) {
    // Other errors are handled by the interceptor
    console.log(error);
    return [];
  }
};

// Validation
export const validateRequiredField = (fieldValue) => {
  if (!fieldValue) {
    return REQUIRED;
  }
  return null;
};

export const validateHiragana = (fieldValue) => {
  const hiraganaRegex = /^[ぁ-ん]+$/;
  if (!hiraganaRegex.test(fieldValue) && fieldValue) {
    return INVALID_HIRAGANA;
  }
  return null;
};

export const validateTelephone = (fieldValue) => {
  const halfWidthRegex = /^[0-9]+$/;
  if (!fieldValue) {
    return REQUIRED;
  } else if (!halfWidthRegex.test(fieldValue)) {
    return INVALID_TELEPHONE_CHARACTERS;
  } else if (fieldValue.length < 10 || fieldValue.length > 11) {
    return INVALID_TELEPHONE_NUMBER;
  }

  return null;
};

export const validateEmail = (fieldValue) => {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  if (!emailRegex.test(fieldValue) && fieldValue) {
    return INVALID_EMAIL;
  }
  return null;
};

export const validateField = (fieldName, fieldValue) => {
  const fieldValidators = {
    lastName: [validateRequiredField],
    firstName: [validateRequiredField],
    lastNameHiragana: [validateRequiredField, validateHiragana],
    firstNameHiragana: [validateRequiredField, validateHiragana],
    telephone: [validateRequiredField, validateTelephone],
    birthday: [validateRequiredField],
    mail: [validateRequiredField, validateEmail],
    enterDate: [validateRequiredField],
    retireDate: [validateRequiredField],
  };

  const validators = fieldValidators[fieldName];
  const errorMessages = {};

  if (validators) {
    validators.forEach((validator) => {
      const errorMessage = validator(fieldValue);
      errorMessages[fieldName] = errorMessage;
    });
  }

  // Check if the field is empty and set the required message
  if (!fieldValue) {
    errorMessages[fieldName] = REQUIRED;
  }

  return errorMessages;
};
