import { createContext, useState } from "react";

// Create the context
export const MyContext = createContext();

// Create the provider component
export const MyContextProvider = ({ children }) => {
  const [state, setState] = useState("Default Value"); // Example state

  const [totalI, setTotalI] = useState(null);
  const [totalE, setTotalE] = useState(null);
  const [totalB, setTotalB] = useState(null);


  const [all , setAll] = useState()


  const updateState = (newValue) => {
    setState(newValue);
  };

  return (
    <MyContext.Provider
      value={{
        state,
        updateState,
        totalI,
        setTotalI,
        totalE,
        setTotalE,
        totalB,
        setTotalB,all , setAll
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
