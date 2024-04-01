import React, { useCallback, useEffect, useRef, useState } from "react";
import { PencilSquare } from "../components/icons/PencilSquare";
import { Trash } from "../components/icons/Trash";
import { PlusCircleFill } from "../components/icons/PlusCircleFill";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setEmployeeId } from "../stores/actions/employeeId";
import { ConfirmationModal } from "../components/common/ConfirmationModal";
import { PageTitle } from "../components/common/PagesTitle";
import { DELETE_INFO_CONFIRMATION_EMPLOYEE_LIST_PAGE } from "../constants/messageConst";
import {
  COMMISSIONING_STATUS_MAP,
  GENDER_MAP,
} from "../components/EmployeeDetail/constants";
import { useDelete } from "../components/EmployeeDetail/hooks/useDelete";
import { EMPLOYEE_LIST_PAGE } from "../constants/pagesUrlConst";

export const EmployeeList = () => {
  const registerEmployeePage = `${EMPLOYEE_LIST_PAGE}/create`;
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const employeeList = useSelector((state) => state.employeeList.employeeList);
  const employeeId = useSelector((state) => state.employeeId);
  const { deleteEmployee, fetchEmployeeData } = useDelete();
  const handleDelete = async () => {
    await deleteEmployee(() => {
      navigate(EMPLOYEE_LIST_PAGE);
    });
    // Fetch updated employee data after deletion
    if (fetchEmployeeData) {
      await fetchEmployeeData();
    }
  };
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const tableHeaders = [
    { key: "employee_id", label: "社員ID", width: "w-96" },
    { key: "name", label: "氏名", width: "w-392" },
    { key: "sex", label: "性別", width: "w-104" },
    { key: "age", label: "年齢", width: "w-104" },
    { key: "company", label: "会社", width: "w-104" },
    { key: "department", label: "事業部", width: "w-104" },
    { key: "status", label: "稼働状況", width: "w-160" },
    { key: "edit", label: "編集", width: "w-72" },
    { key: "delete", label: "削除", width: "w-72" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (isMounted.current) {
        await fetchEmployeeData();
      }
    };
    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [fetchEmployeeData]);

  useEffect(() => {
    if (employeeId !== null) {
      getModalMessage(employeeId);
    }
  }, [employeeId, getModalMessage]);

  const getModalMessage = useCallback(
    (employeeId) => {
      const foundItem = employeeList.find(
        (item) => item.employee_id === employeeId
      );
      const abbreviation = foundItem?.company.abbreviation || "";
      const lastName = foundItem?.last_name || "";
      const firstName = foundItem?.first_name || "";
      const combinedText = `${abbreviation}${lastName}  ${firstName}`;
      setMessage(
        `${combinedText}${DELETE_INFO_CONFIRMATION_EMPLOYEE_LIST_PAGE}`
      );
    },
    [employeeList]
  );

  // Get gender and commissioning status name from map
  function getNameFromMap(id, map) {
    const match = map.find((item) => item.id === id);
    return match ? match.name : "";
  }

  return (
    <div className="row flex-nowrap m-0">
      <main className="col">
        <PageTitle title="社員一覧" mbClassName={"mb-4"} />
        <div className="d-flex flex-row-reverse mb-2">
          <Link to={registerEmployeePage} className="bg-transparent">
            <button className="btn p-0 border-0">
              <PlusCircleFill />
            </button>
          </Link>
        </div>
        <table className="table table-bordered text-center ">
          <thead className="table-dark">
            <tr className="h-40">
              {tableHeaders.map((header) => (
                <th
                  key={header.key}
                  scope="col"
                  className={`w-104 ${header.width}`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee) => (
              <tr key={employee.employee_id} className="h-40">
                <td>{employee.employee_id}</td>
                <td>{employee.last_name + " " + employee.first_name}</td>
                <td>{getNameFromMap(employee.sex, GENDER_MAP)}</td>
                <td>{employee.age}</td>
                <td>{employee.company.abbreviation}</td>
                <td>{employee.employee_status.department.name}</td>
                <td>
                  {getNameFromMap(
                    employee.employee_status.commissioning_status_id,
                    COMMISSIONING_STATUS_MAP
                  )}
                </td>
                <td>
                  <Link
                    to={`${EMPLOYEE_LIST_PAGE}/${employee.employee_id}`}
                    className="bg-transparent focus-visible"
                  >
                    <button className="bg-transparent border-0">
                      <PencilSquare />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    className="bg-transparent border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => {
                      dispatch(setEmployeeId(employee.employee_id));
                    }}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ConfirmationModal
          title="削除の確認"
          message={message}
          firstButtonName="キャンセル"
          secondButtonName="削除"
          buttonFunction={() => {
            handleDelete(employeeId);
          }}
        />
      </main>
    </div>
  );
};
