import React from "react";
import styles from "./SideBar.module.scss";
import { InfoCircleFill } from "../icons/InfoCircleFill";
import { PersonLinesFill } from "../icons/PersonLinesFill";
import { BarChartFill } from "../icons/BarChartFill";
import { PersonPlusFill } from "../icons/PersonPlusFill";
import { Link, useLocation } from "react-router-dom";
import {
  DASHBOARD_PAGE,
  EMPLOYEE_LIST_PAGE,
  HOMEPAGE,
  USER_ENTRY_PAGE,
} from "../../constants/pagesUrlConst";

export const SideBar = ({ isSidebarOpen }) => {
  const location = useLocation().pathname;
  const anchors = [
    {
      id: "topics",
      icon: <InfoCircleFill />,
      text: "トピックス",
      link: "",
      isActive: location === "" || location === HOMEPAGE,
    },
    {
      id: "employees",
      icon: <PersonLinesFill />,
      text: "社員一覧",
      link: "employees",
      isActive: location === EMPLOYEE_LIST_PAGE,
    },
    {
      id: "dashboard",
      icon: <BarChartFill />,
      text: "ダッシュボード",
      link: "dashboard",
      isActive: location === DASHBOARD_PAGE,
    },
    {
      id: "user-entry",
      icon: <PersonPlusFill />,
      text: "ユーザー登録",
      link: "user-entry",
      isActive: location === USER_ENTRY_PAGE,
    },
  ];

  return (
    <nav
      className={`vh-100 ${styles.sidebarContainer} ${
        isSidebarOpen ? styles.sideBarOpened : styles.sideBarClosed
      }`}
    >
      <div id="sidebar" className={`show position-fixed ${styles.sidebar}`}>
        <div id="sidebar-nav" className="vh-100 list-group pt-2">
          {anchors.map((anchor) => (
            <Link
              to={anchor.link}
              key={anchor.id}
              className={`list-group-item border-0 text-truncate mb-3 ms-2 ps-2 pe-2 ${
                anchor.isActive ? "active" : ""
              }`}
              data-bs-parent="#sidebar"
            >
              {anchor.icon}
              <span className="ms-2">{anchor.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
