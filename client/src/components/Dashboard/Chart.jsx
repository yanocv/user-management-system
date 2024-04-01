// ChartComponent.js

import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { ProgressModal } from "../common/ProgressModal";

export function Chart({ options, extraClasses, isLoading }) {
  const classes = `col ${extraClasses || ""}`;

  return (
    <div className={classes}>
      {options | !isLoading ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <ProgressModal width="25%" variant="sectionView" color="primary" />
      )}
    </div>
  );
}
