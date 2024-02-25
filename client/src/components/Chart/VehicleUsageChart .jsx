import React from "react";
import { Bar } from "react-chartjs-2";

const VehicleUsageChart = ({ data }) => {
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Vehicle Usage",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: data,
      },
    ],
  };

  return (
    <div>
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
