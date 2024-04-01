import axiosInstance from "../api/axios";

export const apiGetCall = (url, options) => axiosInstance.get(url, options);
export const apiPostCall = (url, data) => axiosInstance.post(url, data);
export const deleteData = (url) => axiosInstance.delete(url);
export const apiPutCall = (url, data) => axiosInstance.put(url, data);
