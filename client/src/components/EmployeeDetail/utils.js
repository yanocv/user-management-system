import { apiGetCall } from "../../utils/apiUtil";

// Utility function to filter employee data
export const filterEmployeeData = (data) => {
  console.log(data.birthday);
  return {
    lastName: data.last_name,
    firstName: data.first_name,
    lastNameHiragana: data.last_name_hiragana,
    firstNameHiragana: data.first_name_hiragana,
    birthday: data.birthday,
    sex: data.sex,
    telephone: data.telephone,
    mail: data.mail,
    employeeId: data.employee_id,
    enterDate: data.enter_date,
    retireDate: data.retire_date,
    companyId: data.company.id,
    houseStatusId: data.employee_status.house_status.id,
    departmentId: data.employee_status.department.id,
    businessManager: data.employee_status.business_manager,
    commissioningStatusId: data.employee_status.commissioning_status_id,
  };
};

// Utility function to merge form values with fields
export const mergeFormValuesWithFields = (formValues, fields) => {
  return fields.map((field) => {
    return {
      ...field,
      value: formValues[field.name] || (field.value ? field.value : ""),
    };
  });
};

// Utility function to get company, department, and house status data
export const fetchData = async (endpoint) => {
  try {
    const response = await apiGetCall(endpoint);
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it later if needed
  }
};
