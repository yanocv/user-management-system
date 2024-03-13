import React, { useEffect, useState } from "react";
import styles from "./FormContainer.module.scss";
import { FormSection } from "./FormSection";
import { initialFormValues } from "./constants";
import { Footer } from "./Footer";
import { fetchData, mergeFormValuesWithFields } from "./utils";
import { validateField } from "./helpers";
import { useHandleForm } from "./hooks/useHandleForm";
import { SectionTitle } from "./SectionTitle";
import { RETIRE_STATUS_ID } from "../../constants/formConsts";
import {
  COMPANY_ENDPOINT,
  DEPARTMENTS_LIST_ENDPOINT,
  HOUSE_STATUS_LIST_ENDPOINT,
} from "../../constants/apiUrlConst";
import { EMPLOYEE_LIST_PAGE } from "../../constants/pagesUrlConst";

export const FormContainer = ({
  personalInfoFields,
  shaiinInfoFields,
  backButtonLabel,
  registerButtonLabel,
  isEdit,
  deleteButtonLabel,
  employeeData,
}) => {
  console.log("employeeData", employeeData.birthday);
  // Initialize formValues based on editEmployeeData or initialFormValues
  const [formValues, setFormValues] = useState({
    ...initialFormValues,
    birthday: employeeData.birthday,
  });
  // Error messages for input fields
  const [inputFieldErrorMessage, setInputFieldErrorMessage] = useState({
    lastName: "",
    firstName: "",
    lastNameHiragana: "",
    firstNameHiragana: "",
    birthday: "",
    telephone: "",
    mail: "",
    retireDate: "",
  });
  const { errorMessage, handleForm } = useHandleForm();

  useEffect(() => {
    const setValues = (data, valuesKey) => {
      const updatedFields = [...shaiinInfoFields];
      const fieldIndex = updatedFields.findIndex(
        (field) => field.name === valuesKey
      );

      if (fieldIndex !== -1) {
        if (valuesKey === "companyId") {
          updatedFields[fieldIndex].values = data.map((company) => ({
            id: company.id,
            name: `${company.name}（${company.abbreviation}）`,
          }));
        } else {
          updatedFields[fieldIndex].values = data;
        }

        const keyMapping = {
          companyId: "companyId",
          departmentId: "departmentId",
          houseStatusId: "houseStatusId",
        };

        const firstItemId = data.length > 0 ? data[0].id : "";
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          [keyMapping[valuesKey]]: firstItemId,
        }));
      }
    };

    Promise.all([
      fetchData(COMPANY_ENDPOINT),
      fetchData(DEPARTMENTS_LIST_ENDPOINT),
      fetchData(HOUSE_STATUS_LIST_ENDPOINT),
    ])
      .then(([companyData, departmentData, houseStatusData]) => {
        setValues(companyData, "companyId");
        setValues(departmentData, "departmentId");
        setValues(houseStatusData, "houseStatusId");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [shaiinInfoFields]);

  useEffect(() => {
    if (employeeData) {
      setFormValues({
        ...employeeData,
      });
    }
  }, [employeeData]);

  useEffect(() => {
    const retireDate = shaiinInfoFields.find(
      (field) => field.name === "retireDate"
    );
    if (!isEdit) {
      retireDate.disabled = true;
    } else {
      retireDate.value
        ? (retireDate.disabled = false)
        : (retireDate.disabled = true);
    }
  }, [isEdit, shaiinInfoFields]);

  const shaiinFieldsWithValues = mergeFormValuesWithFields(
    formValues,
    shaiinInfoFields
  );
  const personalFieldsWithValues = mergeFormValuesWithFields(
    formValues,
    personalInfoFields
  );

  useEffect(() => {
    setInputFieldErrorMessage((prevErrorMessage) => ({
      ...prevErrorMessage,
      ...errorMessage,
    }));
  }, [errorMessage]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    // Enable the retireDate input field if the houseStatusId is not 退職
    if (name === "houseStatusId") {
      const updatedFields = [...shaiinInfoFields];
      const fieldIndex = updatedFields.findIndex(
        (field) => field.name === "retireDate"
      );
      if (value !== RETIRE_STATUS_ID) {
        // Clear the retireDate when houseStatus is not "退職"
        setFormValues({ ...formValues, [name]: value, retireDate: "" });
        updatedFields[fieldIndex].disabled = true;
        return updatedFields;
      } else {
        // Set the value of houseStatus and enable the retireDate input
        setFormValues({ ...formValues, [name]: value });
        updatedFields[fieldIndex].disabled = false;
        return updatedFields;
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    const newErrorMessages = validateField(name, value);
    setInputFieldErrorMessage((prevErrorMessage) => ({
      ...prevErrorMessage,
      ...newErrorMessages,
    }));
  };

  const checkRetireDate = shaiinFieldsWithValues.find(
    (field) => field.name === "retireDate"
  ).value;
  if (checkRetireDate) {
    shaiinFieldsWithValues.find(
      (field) => field.name === "retireDate"
    ).disabled = false;
  }

  return (
    <>
      {employeeData && (
        <>
          <div
            noValidate
            className={`d-flex flex-column ${styles.formContainer}`}
          >
            <SectionTitle title="個人情報" />
            <FormSection
              inputs={isEdit ? personalFieldsWithValues : personalInfoFields}
              onChange={handleFieldChange}
              errorMessage={inputFieldErrorMessage}
            />

            <SectionTitle title="社員情報" />
            <FormSection
              inputs={
                isEdit ? shaiinFieldsWithValues : shaiinInfoFields.slice(1)
              }
              onChange={handleFieldChange}
              errorMessage={inputFieldErrorMessage}
            />
          </div>
          <Footer
            backButtonLink={EMPLOYEE_LIST_PAGE}
            backButtonLabel={backButtonLabel}
            registerButtonLabel={registerButtonLabel}
            isEdit={isEdit}
            deleteButtonLabel={deleteButtonLabel}
            handleForm={() => handleForm(formValues, isEdit)}
          />
        </>
      )}
    </>
  );
};
