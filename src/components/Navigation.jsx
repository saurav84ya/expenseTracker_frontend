import React, { useState, useEffect, useRef, useContext } from "react";
import avtar from "../imgs/avtar.png";
import {
  Banknote,
  CircleGauge,
  CreditCard,
  HandCoins,
  LogOut,
  Menu,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { MyContext } from "@/MyContext";

export default function Navigation({ active, setActive }) {
  const { user } = useSelector((state) => state.authSlice) || {};
  const { balance } = useSelector((state) => state.incomeSlice);
  const [close, setClose] = useState(false);
  const menuRef = useRef(null);

  const dispatch = useDispatch();

  const menuItems = [
    { id: 1, name: "Dashboard", icon: <CircleGauge /> },
    { id: 2, name: "View Transactions", icon: <CreditCard /> },
    { id: 3, name: "Incomes", icon: <HandCoins /> },
    { id: 4, name: "Expenses", icon: <Banknote /> },
  ];

  const logoutFun = () => {
    dispatch(logout());
  };

  const renderMenuItems = () =>
    menuItems.map((list) => (
      <div
        key={list.id}
        onClick={() => {
          setActive(list.id);
          setClose(false); // Close menu on selection
        }}
        className={`flex cursor-pointer mb-2 gap-3 ${
          active === list.id ? "opacity-100 font-bold" : "opacity-70"
        } hover:opacity-100`}
      >
        {list.icon}
        <p>{list.name}</p>
      </div>
    ));

  // Close the menu when clicking outside of it
  const abc = balance || user?.balance
  const {setTotalB} = useContext(MyContext)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setClose(false);
      }
    };
    setTotalB(abc)

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


 
  return (
    <>
      {/* Mobile Navigation */}
      {!close ? (
        <div
          onClick={() => setClose(!close)}
          className="flex xl:hidden z-20 absolute p-3 bg-white left-6 top-6 cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <Menu />
        </div>
      ) : null}

      <div
        ref={menuRef}
        className={`w-[250px] absolute left-5 h-[80vh] flex xl:hidden flex-col border-[5px] border-white bg-[#FAC67A] shadow-2xl z-50 rounded-xl pl-7 pt-[50px] transform transition-all duration-300 ${
          close ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        {/* User Info */}
        <div className="flex gap-3">
          <img
            src={avtar}
            className="h-[50px] w-[50px] border-2 border-white bg-white rounded-full"
            alt="User Avatar"
          />
          <div>
            <h1 className="font-bold">
              {user ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "Guest"}
            </h1>
            <p>
              Total:{" "}
              <span>
                <span className="font-bold">$ </span>
                <span
                  className={`${
                    (balance || user?.balance) > 500 ? "text-green-500" : "text-red-500"
                  } font-bold`}
                >
                  {balance || user?.balance}
                </span>
              </span>
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="mt-[40px]">{renderMenuItems()}</div>

        {/* Logout */}
        <div
          onClick={logoutFun}
          className="flex items-center opacity-50 font-bold gap-1 hover:opacity-100 cursor-pointer absolute bottom-3 left-3"
        >
          <LogOut size={15} className="font-bold" />
          <p>Sign Out</p>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="lg:w-[250px] w-[200px] border-[5px] border-white shadow-2xl h-[80vh] xl:flex flex-col hidden relative bg-[#F9E6CF] z-50 rounded-xl md:ml-[10px] lg:ml-[20px] xl:ml-[30px] pl-2 lg:pl-7 pt-[50px]">
        {/* User Info */}
        <div className="flex gap-3">
          <img
            src={avtar}
            className="h-[50px] w-[50px] border-2 border-white bg-white rounded-full"
            alt="User Avatar"
          />
          <div>
            <h1 className="font-bold">
              {user ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "Guest"}
            </h1>
            <p>
              Total:{" "}
              <span>
                <span className="font-bold">$ </span>
                <span
                  className={`${
                    (balance || user?.balance) > 500 ? "text-green-500" : "text-red-500"
                  } font-bold`}
                >
                  {balance || user?.balance}
                </span>
              </span>
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="mt-[40px]">{renderMenuItems()}</div>

        {/* Logout */}
        <div
          onClick={logoutFun}
          className="flex items-center opacity-50 font-bold gap-1 hover:opacity-100 cursor-pointer absolute bottom-3 left-3"
        >
          <LogOut size={15} className="font-bold" />
          <p>Sign Out</p>
        </div>
      </div>
    </>
  );
}
