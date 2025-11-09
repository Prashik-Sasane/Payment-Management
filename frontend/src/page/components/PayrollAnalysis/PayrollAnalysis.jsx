import React, { useEffect, useState } from "react";
import api from "../../../api/axios"
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

export default function PayrollAnalysis() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/api/payroll/summary");
        const data = res.data;

        const labels = data.map((item) => item.month);
        const netPay = data.map((item) => item.total_net_pay || 0);
        const taxes = data.map((item) => item.total_tax || 0);
        const deductions = data.map((item) => item.total_deductions || 0);
        const bonuses = data.map((item) => item.total_bonus || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "Net Pay",
              data: netPay,
              backgroundColor: "#0ea5e9",
              borderRadius: 6,
              stack: "combined",
            },
            {
              label: "Taxes",
              data: taxes,
              backgroundColor: "#6366f1",
              borderRadius: 6,
              stack: "combined",
            },
            {
              label: "Bonuses",
              data: bonuses,
              backgroundColor: "#a78bfa",
              borderRadius: 6,
              stack: "combined",
            },
            {
              label: "Deductions",
              data: deductions,
              backgroundColor: "#fca5a5",
              borderRadius: 6,
              stack: "combined",
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching payroll summary:", err);
      }
    };

    fetchSummary();
  }, []);

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
      x: { stacked: true, grid: { display: false } },
      y: {
        stacked: true,
        grid: { color: "#f1f5f9" },
        ticks: {
          callback: (value) => value / 1000 + "K",
        },
      },
    },
  };

  return (
    <div className="p-2 px-4 rounded-2xl h-full">
      <div className="h-72">
        <div className="font-bold text-lg mb-2">Payroll Cost Summary</div>
        {chartData ? (
          <Bar data={chartData} options={stackedBarOptions} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
}
