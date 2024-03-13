import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Topics } from "./pages/Topics";
import { Layout } from "./components/common/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Provider } from "react-redux";
import React from "react";
import { EmployeeList } from "./pages/EmployeeList";
import store from "./stores/index";
import { PrivateRoutes } from "./components/routes/PrivateRoutes";
import { AnonymousRoutes } from "./components/routes/AnonymousRoutes";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Employee } from "./pages/Employee";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Topics />} />
                <Route path="employees" element={<EmployeeList />} />
                <Route
                  path="employees/create"
                  element={<Employee isRegister />}
                />
                <Route
                  path="employees/:employeeId"
                  element={<Employee isEdit />}
                />
                <Route path="user-entry" element={<Register />} />
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Route>
            <Route element={<AnonymousRoutes />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
