import React, { useEffect, useState } from "react";
import { Chart } from "./Chart";
import { apiGetCall } from "../../utils/apiUtil";
import { COMPARISON_ENDPOINT } from "../../constants/apiUrlConst";

export const EmployeeStatus = () => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await apiGetCall(COMPARISON_ENDPOINT, {
          signal: controller.signal,
        });
        const departmentsData = response.data.departments;
        const categories = Object.keys(departmentsData);
        // Define the stacks (operation status)
        const stacks = ["commit", "notCommit"];
        // Calculate the data for each department and stack
        const seriesData = stacks.map((stack) => {
          const data = categories.map((category) => {
            return departmentsData[category][stack];
          });
          // Create the operationStatus array with the corresponding values
          const operationStatus = stack === "commit" ? "稼働" : "未稼働";
          return {
            name: operationStatus,
            data,
          };
        });

        setOptions({
          chart: {
            type: "column",
          },
          title: {
            text: "各事業部の稼働と未稼働者の比率",
          },
          xAxis: {
            categories: categories.map((category) => {
              if (category === "dev") {
                return "開発";
              }
              if (category === "nw") {
                return "NW";
              } else {
                return "検証";
              }
            }),
          },
          yAxis: {
            min: 0,
            title: {
              text: "稼働・未稼働",
            },
          },
          tooltip: {
            pointFormat:
              '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true,
          },
          plotOptions: {
            column: {
              stacking: "percent",
            },
          },
          credits: false,
          series: seriesData,
        });
      } catch (error) {
        // Errors are handled by the interceptor
        console.log(error);
        return;
      }
    };
    fetchData();

    // Abort the fetch when the component unmounts, to avoid a memory leak
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Chart
      options={options}
      isLoading={options ? false : true}
      extraClasses="shadow"
    />
  );
};
