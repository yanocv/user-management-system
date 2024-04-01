import React from "react";
import { PageTitle } from "../components/common/PagesTitle";
import { EmployeeCount } from "../components/Dashboard/EmployeeCount";
import { EmployeeStatus } from "../components/Dashboard/EmployeeStatus";
import { DepartmentEmployeeRatio } from "../components/Dashboard/DepartmentEmployeeRatio";

export const Dashboard = () => {
  return (
    <div className="row flex-nowrap m-0">
      <main className="col">
        <PageTitle title="統計情報" mbClassName={"mb-4"} />
        <EmployeeCount />
        <div className="p-0 mt-4 mb-3">
          <div className="row shadow m-1 mb-3">
            {/* Second chart */}
            <DepartmentEmployeeRatio />
            {/* Third chart */}
            <EmployeeStatus />
          </div>
        </div>
      </main>
    </div>
  );
};
