import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = ({ dashBoardIncome, dashBoardExpnses }) => {


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
    labels: allDates,
    datasets: [
      {
        label: 'Expnse',
        data: expensePoints,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
      {
        label: 'Income',
        data: incomePoints,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
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
        text: 'Graph',
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;
