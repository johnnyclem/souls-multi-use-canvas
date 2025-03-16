// src/components/ChartComponent.tsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { ContentData } from "../types";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartComponentProps {
  data: ContentData;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  const chartData = data.chartData || {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Sample Data",
        data: [12, 19, 3],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Sample Chart" },
    },
  };

  const renderChart = () => {
    switch (data.chartType) {
      case "bar":
        return <Bar data={chartData} options={options} />;
      case "line":
        return <Line data={chartData} options={options} />;
      case "pie":
        return <Pie data={chartData} options={options} />;
      default:
        return <Bar data={chartData} options={options} />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white p-4 rounded-lg shadow-md">{renderChart()}</div>
    </div>
  );
};

export default ChartComponent;