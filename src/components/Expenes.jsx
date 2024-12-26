import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { addExpanse, delExpanse, getExpanse } from "@/store/tranisations";
//update
import {
  BadgeX,
  BaggageClaim,
  Bike,
  Bitcoin,
  CircuitBoard,
  LandPlot,
  LibraryBig,
  MessageCircleMore,
  NotebookPen,
  NotepadTextDashed,
  PiggyBank,
  Podcast,
  Scroll,
  Stethoscope,
  WalletMinimal,
  Youtube,
} from "lucide-react";

const incomeIcons = {
  medical: <Stethoscope size={40} />,
  trip: <Bike size={40} />,
  sports: <LandPlot size={40} />,
  suscription: <Podcast size={40} />,
  tution: <NotebookPen size={40} />,
  mislinious: <WalletMinimal size={40} />,
  emi: <PiggyBank size={40} />,
  market: <BaggageClaim size={40} />,
  other: <Scroll size={40} />,
};

export default function Expenes() {
  const dispatch = useDispatch();
  const { isFetchExpanseLoading, fetchDataExpanse } = useSelector(
    (state) => state.incomeSlice
  );
  //update
  const { user } = useSelector((state) => state.authSlice);
  const { toast } = useToast();

  // //("fetchDataExpanse" ,fetchDataExpanse)
  // //("balance" , balance)
  //
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
    userId: user?.id,
  });

  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddExpanse = (e) => {
    e.preventDefault();
    dispatch(addExpanse(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message || "Income added successfully",
        });
        setFormData({
          title: "",
          amount: "",
          category: "",
          description: "",
          date: "",
          userId: user?.id,
        });
        setRefreshTrigger((prev) => !prev); // Trigger re-fetch
      } else {
        toast({
          title: data?.payload?.message || "Server not responding",
          variant: "destructive",
        });
      }
    });
  };

  const handleDeleteExpanse = (expanseId) => {
    dispatch(delExpanse({ userId: user.id, expanseId })).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Income deleted successfully",
        });
        setRefreshTrigger((prev) => !prev); // Trigger re-fetch
      } else {
        toast({
          title: "Failed to delete income",
          variant: "destructive",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getExpanse(user?.id));
  }, [dispatch, user?.id, refreshTrigger]);

  const inputClasss = "border-[2px] h-10 w-full p-3 border-white rounded-[5px]";

  const totalExpanse =
    fetchDataExpanse?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;

  return (
    <>
      {/* <h1 className="font-bold text-2xl mt-7 ml-4 text-center">Incomes</h1> */}
      <div className="font-bold text-2xl my-7 ml-4 text-center">
        <h2>
          Total expenes : <span className="text-red-500">${totalExpanse}</span>
        </h2>
      </div>
      <div className="flex md:flex-row-reverse justify-center lg:gap-0 xl:gap-4 flex-col">
        <div>
          <div className="flex flex-col items-center gap-3 p-5 overflow-y-auto overflow-x-hidden h-[500px] md:h-[800px] lg:h-[600px] w-full">
            {fetchDataExpanse?.map((item, index) => (
              <div
                // onRander={() =>  {totalExpanse = totalIncome + Number(item.amount)} }
                key={index}
                className="flex relative items-center p-2 border-2 rounded-[20px] w-full md:w-[420px] border-white hover:border-black gap-3"
              >
                <div className="w-[55px] h-[55px] flex items-center justify-center border-2 border-white hover:border-black rounded-2xl">
                  {incomeIcons[item.category] || <LibraryBig />}
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute w-[10px] h-[10px] top-2 rounded-full bg-red-400"></div>
                    <p className="ml-4 font-bold">
                      {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <p>
                      <span className="font-bold">$</span> {item.amount}
                    </p>
                    <p>{item.date}</p>
                    <div className="flex gap-1 items-center">
                      <span className="font-bold">
                        <MessageCircleMore size={15} />
                      </span>
                      <p className="w-[90px]">{item.description}</p>
                    </div>
                    <button
                      className="md:p-2 p-1 bg-violet-900 hover:bg-red-500 text-white rounded-full absolute md:right-3 right-1 md:top-4 top-1"
                      onClick={() => handleDeleteExpanse(item._id)}
                    >
                      <BadgeX />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <form onSubmit={handleAddExpanse} className="flex flex-col gap-3">
            <input
              className={`${inputClasss}`}
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
            <input
              className={`${inputClasss}`}
              type="number"
              name="amount"
              placeholder="Amount in $"
              value={formData.amount}
              onChange={handleChange}
            />
            <input
              className={`${inputClasss}`}
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <div className="flex items-center gap-3">
              <textarea
                className={`${inputClasss} h-[100px]`}
                name="description"
                placeholder="Add A Reference"
                value={formData.description}
                onChange={handleChange}
              />
              <select
                className={`${inputClasss} w-[150px] h-[60px]`}
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">select</option>
                <option value="medical">Medical</option>
                <option value="trip">Trip</option>
                <option value="sports">Sports</option>
                <option value="suscription">Suscription</option>
                <option value="tution">Tution fee</option>
                <option value="mislinious">Mislinious</option>
                <option value="emi">Emi</option>
                <option value="market">Market</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button
              className="text-white text-center font-bold p-2 bg-red-500 hover:bg-red-600 rounded-[10px]"
              type="submit"
            >
              {isFetchExpanseLoading ? (
                <div className="justify-center items-center  flex" >
                  <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                </div>
              ) : (
                "+ Add Expens"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
