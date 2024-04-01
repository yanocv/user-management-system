import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { SideBar } from "./SideBar";
import { clearToast } from "../../stores/toast/constants";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Layout.module.scss";
import { Toast } from "./Toast";
import { EMPLOYEE_LIST_PAGE } from "../../constants/pagesUrlConst";

export const Layout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Check if the current URL path includes "/employees"
    const isEmployeeListPage = location.pathname.includes(EMPLOYEE_LIST_PAGE);

    // If the current page is NOT the EmployeeList page, clear the toast
    if (!isEmployeeListPage) {
      clearToast(dispatch);
    }
    clearToast(dispatch);
  }, [location, dispatch]);
  return (
    <>
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className={`${styles.layout} d-flex`}>
        <SideBar isSidebarOpen={isSidebarOpen} />
        <div className="container-fluid flex-shrink-1 p-0">
          <Outlet />
        </div>

        <Toast toastStore={toast} showToast={() => toast.open} />
      </div>
    </>
  );
};
