import { format, subYears } from "date-fns";

const currentDate = new Date();
const defaultEnterDate = format(currentDate, "yyyy-MM-dd");
const defaultBirthday = format(subYears(currentDate, 20), "yyyy-MM-dd");

export { defaultEnterDate, defaultBirthday };
export const GENDER_MAP = [
  { id: "0", name: "男" },
  { id: "1", name: "女" },
];

export const COMMISSIONING_STATUS_MAP = [
  { id: 0, name: "未稼働" },
  { id: 1, name: "稼働" },
];

export const personalInfoFields = [
  {
    name: "lastName",
    type: "text",
    label: "姓",
    required: true,
  },
  {
    name: "firstName",
    type: "text",
    label: "名",
    required: true,
  },
  {
    name: "lastNameHiragana",
    type: "text",
    label: "せい",
    required: true,
  },
  {
    name: "firstNameHiragana",
    type: "text",
    label: "めい",
    required: true,
  },
  {
    name: "birthday",
    type: "date",
    label: "生年月日",
    required: true,
    value: defaultBirthday,
  },
  {
    name: "sex",
    type: "select",
    required: true,
    label: "性別",
    values: GENDER_MAP,
  },
  {
    name: "telephone",
    type: "tel",
    label: "電話番号",
    required: true,
  },
  {
    name: "mail",
    type: "email",
    label: "メールアドレス",
    required: true,
  },
];

export const shaiinInfoFields = [
  {
    name: "employeeId",
    type: "text",
    label: "社員ID",
    required: false,
    disabled: true,
  },
  {
    name: "enterDate",
    type: "date",
    label: "入社日",
    required: true,
    value: defaultEnterDate,
  },
  {
    name: "retireDate",
    type: "date",
    label: "退職日",
    required: true,
    disabled: true,
  },
  {
    name: "companyId",
    required: true,
    label: "所属会社",
    type: "select",
  },
  {
    name: "houseStatusId",
    type: "select",
    label: "ステータス",
    required: true,
  },
  {
    name: "departmentId",
    type: "select",
    label: "事業部",
    required: true,
  },
  {
    name: "businessManager",
    type: "text",
    label: "担当管理営業",
  },
  {
    name: "commissioningStatusId",
    type: "select",
    label: "稼働状況",
    required: true,
    values: COMMISSIONING_STATUS_MAP,
  },
];

export const initialFormValues = {
  lastName: "",
  firstName: "",
  lastNameHiragana: "",
  firstNameHiragana: "",
  birthday: defaultBirthday,
  sex: GENDER_MAP[0]["id"],
  telephone: "",
  mail: "",
  employeeId: "",
  enterDate: defaultEnterDate,
  retireDate: "",
  companyId: "",
  houseStatusId: "",
  departmentId: "",
  businessManager: "",
  commissioningStatusId: COMMISSIONING_STATUS_MAP[0]["id"],
};
