import React, { useEffect, useState } from "react";
import {
  personalInfoFields,
  shaiinInfoFields,
} from "../components/EmployeeDetail/constants";
import { FormContainer } from "../components/EmployeeDetail/FormContainer";
import { useParams } from "react-router-dom";
import { apiGetCall } from "../utils/apiUtil";
import { useDispatch } from "react-redux";
import { filterEmployeeData } from "../components/EmployeeDetail/utils";
import { setEmployeeId } from "../stores/actions/employeeId";
import { setModalMessage } from "../stores/actions/formModalMessage";
import { EMPLOYEE_LIST_ENDPOINT } from "../constants/apiUrlConst";
import { PageTitle } from "../components/common/PagesTitle";

export const Employee = ({ isEdit }) => {
  const dispatch = useDispatch();
  const employeeId = parseInt(useParams()["employeeId"]);
  // State to store the data from the API for the edit page
  const [employeeData, setEmployeeData] = useState({});

  // Fetch the data from the API for the edit page
  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        try {
          const response = await apiGetCall(
            `${EMPLOYEE_LIST_ENDPOINT}${employeeId}`
          );
          const data = response.data.result.employee;
          // Filter the data to keep only the desired fields
          const filteredData = filterEmployeeData(data);
          setEmployeeData(filteredData);
          const message = `${filteredData.lastName}${filteredData?.firstName}`;
          setModalMessage(message);
          dispatch(setModalMessage(message));
        } catch (error) {
          // Other errors are handled by the interceptor
          console.log(error);
        }
      };
      fetchData();
    }
  }, [dispatch, employeeId, isEdit]);

  useEffect(() => {
    dispatch(setEmployeeId(employeeId));
  }, [employeeId, dispatch]);

  return (
    <div className="container-fluid flex-shrink-1 p-0">
      <div className="flex-nowrap m-0 justify-content-center align-items-center d-flex flex-column">
        <PageTitle title={isEdit ? "社員詳細" : "社員登録"} />
        <FormContainer
          personalInfoFields={personalInfoFields}
          shaiinInfoFields={shaiinInfoFields}
          backButtonLabel="一覧に戻る"
          registerButtonLabel={isEdit ? "更新" : "登録"}
          deleteButtonLabel="削除"
          isEdit={isEdit}
          employeeData={isEdit ? employeeData : null}
        />
      </div>
    </div>
  );
};
