import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the required modules for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ dashBoardIncome, dashBoardExpnses }) => {
  //("dashBoardIncome", dashBoardIncome, "dashBoardExpnses", dashBoardExpnses);

  // Helper function to aggregate data by date
  const aggregateDataByDate = (data) => {
    const aggregated = {};
    if (data && Array.isArray(data)) {
      data.forEach((item) => {
        const { date, amount } = item;
        if (!aggregated[date]) {
          aggregated[date] = 0;
        }
        aggregated[date] += amount;
      });
    }
    return aggregated;
  };

  // Ensure default values if props are null or undefined
  const safeIncomeData = dashBoardIncome || [];
  const safeExpenseData = dashBoardExpnses || [];

  // Aggregate income and expense data
  const incomeData = aggregateDataByDate(safeIncomeData);
  const expenseData = aggregateDataByDate(safeExpenseData);

  // Extract dates and sort them
  const allDates = Array.from(
    new Set([...Object.keys(incomeData), ...Object.keys(expenseData)])
  ).sort();

  // Prepare data points for income and expenses
  const incomePoints = allDates.map((date) => incomeData[date] || 0);
  const expensePoints = allDates.map((date) => expenseData[date] || 0);

  // Define chart data and options
  const data = {
    labels: allDates, // X-axis labels (dates)
    datasets: [
      {
        label: 'Expense',
        data: expensePoints, // Data points for expenses
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Income',
        data: incomePoints, // Data points for income
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Income vs Expense",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
