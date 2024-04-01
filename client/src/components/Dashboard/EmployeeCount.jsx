import React, { useEffect, useMemo, useState } from "react";
import { Chart } from "./Chart";
import { Select } from "./Select";
import { Card } from "./Card";
import { apiGetCall } from "../../utils/apiUtil";
import {
  COMPANY_ENDPOINT,
  EMPLOYEES_ENDPOINT,
} from "../../constants/apiUrlConst";

export const EmployeeCount = () => {
  const [selectedCompany, setSelectedCompany] = useState("グループ全体");
  const [isLoading, setIsLoading] = useState(true);
  // Define the state for the selected company id of the pull-down menu
  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [companies, setCompanies] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: "column",
    },

    title: {
      text: "1年の社員数変動",
    },
    subtitle: {
      text: selectedCompany,
    },

    plotOptions: {
      series: {
        pointWidth: 45,
      },
    },
    xAxis: {
      type: "category",
      labels: {
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "社員数",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "社員数: {point.y:.0f}人",
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Companies",
        colors: ["#7cb5ec"],
        colorByPoint: true,
        groupPadding: 0,
        data: [0],
        dataLabels: {
          enabled: true,
          color: "#FFFFFF",
          align: "center",
          format: "{point.y:.0f}",
          y: 6,
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
    ],
  });
  const [cardData, setCardData] = useState([
    {
      title: "現在の社員数",
      text: 0,
    },
    {
      title: "前月の新入社員",
      text: 0,
    },
    {
      title: "前月の退職者数",
      text: 0,
    },
  ]);
  const monthMap = useMemo(
    () => ({
      January: "1月",
      February: "2月",
      March: "3月",
      April: "4月",
      May: "5月",
      June: "6月",
      July: "7月",
      August: "8月",
      September: "9月",
      October: "10月",
      November: "11月",
      December: "12月",
    }),
    []
  );

  useEffect(() => {
    // Get company name from database
    if (!selectedCompanyId) {
      const controller = new AbortController();
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await apiGetCall(EMPLOYEES_ENDPOINT, {
            signal: controller.signal,
          });
          const allCompaniesEmployeesNumber = response.data.result.fluctuation;
          const totalEmployees = response.data.result.total;
          const newEmployees = response.data.result.newJoin;
          const retireEmployees = response.data.result.retire;
          setCardData([
            { title: "現在の社員数", text: totalEmployees },
            { title: "前月の新入社員", text: newEmployees },
            { title: "前月の退職者数", text: retireEmployees },
          ]);

          // Convert API data into Highcharts format (array of arrays) with Japanese months
          const chartData = Object.entries(allCompaniesEmployeesNumber).map(
            ([category, value]) => [monthMap[category], value]
          );

          // Update the options with the fetched data
          setOptions((prevOptions) => ({
            ...prevOptions,
            series: [{ ...prevOptions.series[0], data: chartData }],
          }));
          setIsLoading(false);
        } catch (error) {
          // Other errors are handled by the interceptor
          setIsLoading(false);
        }
      };
      fetchData();

      return () => {
        controller.abort();
      };
    } else {
      const controller = new AbortController();
      const getCompanyData = async () => {
        setIsLoading(true);
        try {
          const response = await apiGetCall(
            `${EMPLOYEES_ENDPOINT}/${selectedCompanyId}`,
            {
              signal: controller.signal,
            }
          );
          const companyEmployeesData = response.data.result;

          // Update options for Highcharts with the new data
          const chartData = Object.entries(
            companyEmployeesData.fluctuation
          ).map(([category, value]) => [monthMap[category], value]);

          setOptions((prevOptions) => ({
            ...prevOptions,
            series: [{ ...prevOptions.series[0], data: chartData }],
          }));

          // Update card data with the new values
          setCardData([
            {
              title: "現在の社員数",
              text: companyEmployeesData.total,
            },
            {
              title: "前月の新入社員",
              text: companyEmployeesData.newJoin,
            },
            {
              title: "前月の退職者数",
              text: companyEmployeesData.retire,
            },
          ]);
          setIsLoading(false);
        } catch (error) {
          // Other errors are handled by the interceptor
          setIsLoading(false);
        }
      };

      getCompanyData();

      return () => {
        controller.abort();
      };
    }
  }, [monthMap, selectedCompany, selectedCompanyId]);

  // Updates the subtitle when the selected company changes
  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      subtitle: {
        text: selectedCompany,
      },
    }));
  }, [selectedCompany]);

  // Fetch company name from database for the pull-down menu
  useEffect(() => {
    const controller = new AbortController();
    // Get company name from database
    const getCompanyData = async () => {
      try {
        const response = await apiGetCall(COMPANY_ENDPOINT, {
          signal: controller.signal,
        });
        setCompanies(response.data.result);
      } catch (error) {
        console.log(error);
        // Error is handled by the interceptor
        return;
      }
    };

    getCompanyData();

    // Abort fetch when component unmounts, to avoid a memory leak
    return () => {
      controller.abort();
    };
  }, []);

  const handleChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedCompanyId = selectedIndex === 0 ? null : selectedIndex;
    setSelectedCompany(e.target.value);
    setSelectedCompanyId(selectedCompanyId);
  };

  return (
    <>
      <Select
        selectedCompany={selectedCompany}
        handleChange={handleChange}
        companies={companies}
      />
      <div
        className={`p-0 mt-3 mb-3 row mt-4 flex-nowrap justify-content-center`}
      >
        {cardData.map((card, index) => (
          <Card card={card} index={index} key={index} />
        ))}
      </div>
      {/* Margin of 4px(m-1) because the col of main introduces a default padding of 12px*/}
      <div className={`row m-1`}>
        <Chart
          options={options}
          isLoading={isLoading}
          extraClasses="mb-3 shadow-lg"
        />
      </div>
    </>
  );
};
