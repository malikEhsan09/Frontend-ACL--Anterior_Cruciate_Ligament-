import React, { useMemo } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Card, CardContent, Typography } from "@mui/material";

export default function FeedbackChart({ title, data, labels }) {
  const [chartData, setChartData] = React.useState(null);

  const options = useMemo(() => {
    return {
      type: "pie",
      series: data || [23, 10, 25, 13],
      height: 400,
      options: {
        labels: labels || ["Feedback", "Complaint", "Suggestion", "Bugs"],
        legend: {
          show: true,
          fontSize: "14px",
          fontFamily: `'Roboto', sans-serif`,
          position: "bottom",
          labels: {
            useSeriesColors: false,
          },
        },
      },
    };
  }, [data, labels]);

  React.useEffect(() => {
    setTimeout(() => {
      setChartData(options);
    }, 100);
  }, [options]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
          {title || "Feedback by Type"}
        </Typography>
        {chartData ? <Chart {...chartData} width="100%" /> : "Loading..."}
      </CardContent>
    </Card>
  );
}
