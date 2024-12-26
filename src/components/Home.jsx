import React, { useState } from "react";
import Navigation from "./Navigation";
import SideHome from "./SideHome";

export default function App() {
  const [active, setActive] = useState(1); // Initialize the active state

  return (
    <div className="h-[100vh] w-[100%]  flex  ">
      {/* Blurred Orb Decoration (Optional) */}
      {/* <div className="md:w-[70vh] md:h-[70vh]  w-[30vh] h-[30vh] absolute rounded-full ml-[-37vh] mt-[-37vh] bg-gradient-to-b from-[#F56692] to-[#F2994A] filter blur-[100px] animate-movrorb"></div> */}

      {/* Sidebar */}
      <div className="  flex justify-center relative items-center">
        <Navigation active={active} setActive={setActive} />
      </div>

      {/* Main Content */}
      <div className="w-full flex justify-center items-center ">
        <SideHome active={active} setActive={setActive} />
      </div>
    </div>
  );
}
