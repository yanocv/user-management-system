import React, { useEffect, useState } from "react";
import { Chart } from "./Chart";
import { apiGetCall } from "../../utils/apiUtil";
import { DEPARTMENT_ENDPOINT } from "../../constants/apiUrlConst";

export const DepartmentEmployeeRatio = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    const fetchDepartmentData = async () => {
      try {
        const response = await apiGetCall(DEPARTMENT_ENDPOINT, {
          signal: controller.signal,
        });
        const departmentsData = response.data.departments;
        setDepartmentData(departmentsData);
        setOptions({
          chart: {
            type: "pie",
          },
          title: {
            text: "全事業部の人数比率",
          },
          tooltip: {
            formatter: function () {
              return `${
                this.point.name
              }</br>全体に対する割合: <b>${this.point.y.toFixed(1)}</b> %`;
            },
            useHTML: true,
          },
          accessibility: {
            point: {
              valueSuffix: "%",
            },
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.percentage:.1f} %",
              },
              showInLegend: true,
            },
          },
          series: [
            {
              name: "",
              data: departmentsData,
            },
          ],
          credits: {
            enabled: false,
          },
        });
      } catch (error) {
        // Errors are handled by the interceptor
        console.log(error);
        return;
      }
    };

    fetchDepartmentData();

    // Abort the fetch when the component unmounts, to avoid a memory leak
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Chart
      options={options}
      extraClasses="me-3 w-3 shadow"
      isLoading={departmentData.length ? false : true}
    />
  );
};
