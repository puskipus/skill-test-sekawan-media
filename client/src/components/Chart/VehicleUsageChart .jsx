import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const VehicleUsageChart = ({ data, labels }) => {
  const chartData = {
    labels: labels.map((item) => item),
    datasets: [
      {
        label: "Vehicle Usage",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: data.map((item) => item),
      },
    ],
  };

  return (
    <div className="mt-10">
      <h2>Vehicle Usage Chart</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 1,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default VehicleUsageChart;
