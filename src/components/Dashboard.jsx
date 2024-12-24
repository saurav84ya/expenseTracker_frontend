import React, { useEffect } from "react";
import LineChart from "./ui/LineChart";
import RadarChart from "./ui/RadarChart";
import { useDispatch, useSelector } from "react-redux";
import { getDashBoard } from "@/store/tranisations";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { dashBoardIncome, dashBoardExpnses, dashBoardLoading } = useSelector(
    (state) => state.incomeSlice
  );

  const { user } = useSelector((state) => state.authSlice);

  useEffect(() => {
    dispatch(getDashBoard(user?.id));
  }, [dispatch, user?.id]);

  console.log(dashBoardIncome, dashBoardExpnses)

  // Calculate totals
  const totalIncome = dashBoardIncome?.reduce((sum, item) => sum + item.amount, 0) || 0;
  const totalExpenses = dashBoardExpnses?.reduce((sum, item) => sum + item.amount, 0) || 0;
  const totalBalance = totalIncome - totalExpenses;

  // Combine and sort transactions by updatedAt
  const recentTransactions = [...(dashBoardIncome || []), ...(dashBoardExpnses || [])]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 3);

  // Find min and max for salary and expenses
  const salaryAmounts = dashBoardIncome?.map((item) => item.amount) || [];
  const expenseAmounts = dashBoardExpnses?.map((item) => item.amount) || [];
  const minSalary = Math.min(...salaryAmounts, Infinity);
  const maxSalary = Math.max(...salaryAmounts, -Infinity);
  const minExpense = Math.min(...expenseAmounts, Infinity);
  const maxExpense = Math.max(...expenseAmounts, -Infinity);

  return (
    <div className="grid grid-cols-10 items-center mx-auto">
      <div className="col-span-10 lg:col-span-6 flex flex-col">
        <div className="mx-2 md:m-4 md:hidden min-h-[400px] max-w-[700px] rounded-xl border-[5px] border-white bg-green-100 flex items-center justify-center pb-4">
          <RadarChart />
        </div>

        <div className="mx-2 md:m-4 hidden md:flex min-h-[400px] max-w-[700px] rounded-xl border-[5px] border-white bg-green-100 items-center justify-center pb-4">
          <LineChart />
        </div>

        <div className="flex py-2 md:py-4 md:mx-4 border-[5px] border-white rounded-xl m-2 justify-center gap-4 flex-wrap">
          <div className="bg-blue-100 w-[170px] md:min-w-[250px] font-bold text-violet-500 text-center p-4 rounded-xl border-[3px] border-white">
            <h1>Total Income</h1>
            <h1>${totalIncome}</h1>
          </div>

          <div className="bg-blue-100 w-[170px] md:min-w-[250px] font-bold text-violet-500 text-center px-4 py-2 rounded-xl border-[3px] border-white">
            <h1>Total Expenses</h1>
            <h1>${totalExpenses}</h1>
          </div>

          <div className="bg-blue-100 min-w-[250px] font-bold text-violet-500 text-center p-4 rounded-xl border-[3px] border-white">
            <h1>Total Balance</h1>
            <h1 className={   totalBalance < 500  ?'text-red-600 text-2xl':' text-green-600 text-2xl'}>${totalBalance}</h1>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 col-span-9 w-full m-2 border-[5px] border-white rounded-xl lg:p-4 p-1">
        <h1 className="text-violet-400 font-bold lg:mt-5 mt-0 ml-5">Recent History</h1>
        <div className="flex justify-around flex-row lg:flex-col">
          <div>
            {recentTransactions.map((transaction, index) => (
              <div
                key={index}
                className="lg:mt-4 mt-2 rounded-xl bg-white p-2 lg:p-4 text-green-400 font-bold flex flex-wrap justify-between"
              >
                <h1 className="mr-[30px] md:mr-[100px] lg:mr-0">{

                      transaction.title.length > 13 ? transaction.title.substring(0,13-3) + '...' : transaction.title

                  }</h1>
                <h3>${transaction.amount}</h3>
              </div>
            ))}
          </div>

          <div>
            <div className="flex flex-col justify-between px-7 my-7">
              <div className="flex justify-between w-full">
                <h1>Min</h1>
                <h1 className="font-bold">Salary</h1>
                <h1>Max</h1>
              </div>

              <div className="rounded-xl bg-white p-2 lg:p-4 lg:mb-5 mb-2 text-green-400 font-bold flex flex-wrap justify-between">
                <h1 className="mr-[40px] md:mr-[100px] lg:mr-0">${minSalary}</h1>
                <h3>${maxSalary}</h3>
              </div>

              <div className="flex justify-between w-full">
                <h1>Min</h1>
                <h1 className="font-bold">Expense</h1>
                <h1>Max</h1>
              </div>

              <div className="rounded-xl bg-white p-2 lg:p-4 text-green-400 font-bold flex flex-wrap justify-between">
                <h1>${minExpense}</h1>
                <h3>${maxExpense}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
