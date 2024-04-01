import React from "react";
import { Close } from "../icons/Close";
import { List } from "../icons/List";
import { logout } from "../../stores/actions/authActions";
import { PersonCircle } from "../icons/PersonCircle";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { LOGIN_PAGE } from "../../constants/pagesUrlConst";

export const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(logout());
    navigate(LOGIN_PAGE, { replace: true });
  };
  const toggleSidebar = (e) => {
    e.preventDefault();
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="header">
      <div
        className={`navbar navbar-dark bg-dark justify-content-between ${styles.headerSubContainer}`}
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <a className="navbar-brand rounded-circle p-0" href="#">
              <button
                data-bs-toggle="collapse"
                role="button"
                onClick={toggleSidebar}
                className="border-0 text-white btn p-0"
              >
                {!isSidebarOpen ? <List /> : <Close />}
              </button>
            </a>
            <h4 className="text-white m-0">社員管理システム</h4>
          </div>

          <div className="dropdown pr-2">
            <button
              className="border-0 bg-dark"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-display="static"
            >
              <PersonCircle />
            </button>
            <ul
              className={`dropdown-menu ${styles.dropdownMenu} `}
              aria-labelledby="log out"
            >
              <li>
                <a className="dropdown-item" href="#" onClick={logOut}>
                  ログアウト
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
