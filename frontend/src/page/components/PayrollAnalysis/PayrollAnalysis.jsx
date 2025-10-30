import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const stackedBarData = {
  labels: [
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
  datasets: [
    {
      label: "Net Pay",
      data: [1350000, 1450000, 1250000, 1500000, 1400000, 1550000, 1600000, 1580000, 1620000, 1670000, 1720000, 1800000],
      backgroundColor: "#0ea5e9",
      borderRadius: 6,
      stack: "combined",
    },
    {
      label: "Taxes",
      data: [150000, 180000, 160000, 190000, 170000, 185000, 200000, 210000, 195000, 220000, 230000, 240000],
      backgroundColor: "#6366f1",
      borderRadius: 6,
      stack: "combined",
    },
    {
      label: "Statutories",
      data: [50000, 55000, 52000, 56000, 54000, 57000, 59000, 61000, 60000, 63000, 65000, 67000],
      backgroundColor: "#a78bfa",
      borderRadius: 6,
      stack: "combined",
    },
    {
      label: "Deductions",
      data: [290000, 310000, 300000, 330000, 320000, 340000, 350000, 360000, 370000, 380000, 390000, 400000],
      backgroundColor: "#fca5a5",
      borderRadius: 6,
      stack: "combined",
    },
  ],
};

const stackedBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        color: "#374151",
      },
    },
    tooltip: {
      backgroundColor: "#fff",
      titleColor: "#000",
      bodyColor: "#000",
      borderColor: "#e5e7eb",
      // borderWidth: 1,
      callbacks: {
        label: (context) => {
          const label = context.dataset.label || "";
          const value = context.parsed.y.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
          });
          return ` ${label}: ${value}`;
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: { display: false },
    },
    y: {
      stacked: true,
      grid: { color: "#f1f5f9" },
      ticks: {
        callback: (value) => value / 1000 + "K",
      },
    },
  },
};

export default function PayrollAnalysis() {
    return (
        <div className="p-2 px-4 rounded-2xl h-full">
            <div className="h-72">
                 <div className="font-bold text-lg mb-2">Payroll Cost Summary</div>
                <Bar data={stackedBarData} options={stackedBarOptions} />
            </div>
        </div>
    );
}