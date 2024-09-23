import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Card, CardContent } from "@mui/material";
export default function GrowthChart() {
  const [chartData, setChartData] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      setChartData(options);
    }, 200);
  }, []);

  const options = {
    height: 400,
    type: "bar",
    options: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: true,
        },
        width: "100%",
      },

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },
      xaxis: {
        type: "category",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        show: true,
        fontSize: "14px",
        fontFamily: `'Roboto', sans-serif`,
        position: "bottom",
        offsetX: 20,
        labels: {
          useSeriesColors: false,
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5,
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8,
        },
      },
      fill: {
        type: "solid",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
      },
    },
    series: [
      {
        name: "Users",
        data: [35, 125, 35, 35, 35, 80, 35, 20, 35, 45, 15, 75],
      },
      {
        name: "Nurseries",
        data: [35, 15, 15, 35, 65, 40, 80, 25, 15, 85, 25, 75],
      },
      {
        name: "Gardeners",
        data: [35, 145, 35, 35, 20, 105, 100, 10, 65, 45, 30, 10],
      },
      {
        name: "Products",
        data: [0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0],
      },
    ],
  };
  return (
    <Card>
      <CardContent>
        {chartData ? <Chart {...chartData} width="100%" /> : "Loading..."}
      </CardContent>
    </Card>
  );
}
