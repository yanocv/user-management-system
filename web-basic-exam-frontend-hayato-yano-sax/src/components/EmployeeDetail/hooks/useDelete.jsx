import { apiGetCall, deleteData } from "../../../utils/apiUtil";
import {
  DELETE_INFO_FAILURE_TOAST_MESSAGE,
  DELETE_INFO_SUCCESS_TOAST_MESSAGE,
} from "../../../constants/messageConst";
import { showToast } from "../../../stores/toast/action";
import { LEVEL_ERROR, LEVEL_INFO } from "../../../stores/toast/constants";
import { useDispatch, useSelector } from "react-redux";
import { setEmployeeList } from "../../../stores/actions/employeeListAction";
import { EMPLOYEE_LIST_ENDPOINT } from "../../../constants/apiUrlConst";

export const useDelete = () => {
  const dispatch = useDispatch();
  const employeeId = useSelector((state) => state.employeeId);

  const fetchEmployeeData = async () => {
    try {
      const response = await apiGetCall(EMPLOYEE_LIST_ENDPOINT);
      const data = response.data.list.rows;
      dispatch(setEmployeeList(data));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async (callback = null) => {
    const urlOfIdToBeDeleted = `${EMPLOYEE_LIST_ENDPOINT}/${employeeId}`;
    try {
      const response = await deleteData(urlOfIdToBeDeleted);

      dispatch(
        showToast({
          open: true,
          message: DELETE_INFO_SUCCESS_TOAST_MESSAGE,
          statusCode: response.status,
          level: LEVEL_INFO,
        })
      );
    } catch (error) {
      dispatch(
        showToast({
          open: true,
          message: DELETE_INFO_FAILURE_TOAST_MESSAGE,
          statusCode: error.response?.status,
          level: LEVEL_ERROR,
        })
      );
    }
    if (callback) {
      callback();
    }
  };

  return {
    deleteEmployee,
    fetchEmployeeData,
  };
};
