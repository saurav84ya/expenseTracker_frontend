import React from "react";
import {
  Bitcoin,
  LibraryBig,
  BadgeX,
  BaggageClaim,
  Bike,
  CircuitBoard,
  LandPlot,
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

import { useSelector, useDispatch } from "react-redux";
import { delExpanse, delIncome } from "@/store/tranisations";
import { useToast } from "@/hooks/use-toast";
// import { toast } from "react-toastify";
// import { delIncome } from "../redux/actions"; // Adjust this import based on your project structure

export default function Transation() {
    const { user } = useSelector((state) => state.authSlice)
    const { toast } = useToast()
  const dispatch = useDispatch();
  const { dashBoardIncome, dashBoardExpnses, dashBoardLoading } = useSelector(
    (state) => state.incomeSlice
  );

  const incomeIcons = {
    freelancing: <CircuitBoard size={40} />,
    Job: <NotepadTextDashed size={40} />,
    digital: <Bitcoin size={40} />,
    yt: <Youtube size={40} />,
    other: <LibraryBig size={40} />,
    medical: <Stethoscope size={40} />,
    trip: <Bike size={40} />,
    sports: <LandPlot size={40} />,
    subscription: <Podcast size={40} />,
    tuition: <NotebookPen size={40} />,
    miscellaneous: <WalletMinimal size={40} />,
    emi: <PiggyBank size={40} />,
    market: <BaggageClaim size={40} />,
    documentation: <Scroll size={40} />,
  };

  const mix = [...(dashBoardIncome || []), ...(dashBoardExpnses || [])].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  // console.log(mix)

  const handleDeleteIncome = (incomeId) => {

    dispatch(delIncome({ userId: user.id, incomeId })).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: 'Income deleted successfully',
        })
        setRefreshTrigger((prev) => !prev) // Trigger re-fetch
      } else {
        toast({
          title: 'Failed to delete income',
          variant: 'destructive',
        })
      }
    })
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
  }

  if (dashBoardLoading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="px-3 gap-2 flex-wrap py-4 flex justify-around items-start " >
      {mix?.map((item, index) => (
        <div
          key={index}
          className="flex relative items-center p-2 border-2 rounded-[20px] w-full md:w-[420px] border-white hover:border-black gap-3"
        >
          <div className="w-[55px] h-[55px] flex items-center justify-center border-2 border-white hover:border-black rounded-2xl">
            {incomeIcons[item.category] || <LibraryBig />}
          </div>
          <div>
            <div className="relative">
              <div
                className={`absolute w-[10px] h-[10px] top-2 rounded-full ${
                  item.x === "i" ? "bg-green-400" : "bg-red-400"
                }`}
              ></div>
              <p className="ml-4 font-bold">
                {item?.title
                  ? item.title.charAt(0).toUpperCase() + item.title.slice(1)
                  : "No Title"}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p>
                <span className="font-bold">$</span> {item.amount || "0.00"}
              </p>
              <p>{item?.date || "No Date"}</p>
              <div className="flex gap-1 items-center">
                <span className="font-bold">
                  <MessageCircleMore size={15} />
                </span>
                <p className="w-[90px]">
                  {item?.description || "No Description"}
                </p>
              </div>
              { item.x === "i" ? <button
                className="md:p-2 p-1 bg-violet-900 hover:bg-red-500 text-white rounded-full absolute md:right-3 right-1 md:top-4 top-1"
                onClick={() => handleDeleteIncome(item._id)}
              >
                <BadgeX />
              </button> : <button
                className="md:p-2 p-1 bg-violet-900 hover:bg-red-500 text-white rounded-full absolute md:right-3 right-1 md:top-4 top-1"
                onClick={() => handleDeleteExpanse(item._id)}
              >
                <BadgeX />
              </button> }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
