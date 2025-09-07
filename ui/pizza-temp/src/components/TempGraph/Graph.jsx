import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { format } from "date-and-time";

export const Graph = ({ dataPoints }) => {
  return (
    <div className="min-w-[250px] w-[490px]">
      <LineChart
        dataset={dataPoints}
        xAxis={[
          {
            id: "time",
            dataKey: "time",
            scaleType: "time",
            valueFormatter: time => format(time, "HH:mm:ss")
          }
        ]}
        yAxis={[{ width: 30 }]}
        series={[
          {
            id: "oven",
            label: "oven",
            dataKey: "temp0",
            area: false,
            showMark: false,
            color: "#FF00FF"
          },
          {
            id: "pi",
            label: "pi",
            dataKey: "temp1",
            area: false,
            showMark: false,
            color: "#FFFF00"
          },
          {
            id: "esp32",
            label: "esp32",
            dataKey: "temp2",
            area: false,
            showMark: false,
            color: "#0000FF"
          },
          {
            id: "target",
            label: "target",
            dataKey: "temp3",
            area: false,
            showMark: false,
            color: "#FF0000"
          }
        ]}
        height={300}
      />
    </div>
  );
};
