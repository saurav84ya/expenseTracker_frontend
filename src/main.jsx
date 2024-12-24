import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { Toaster } from "./components/ui/toaster.jsx";
import store from "./store/store.js";
import { MyContextProvider } from "./MyContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <MyContextProvider> {/* Wrap around App */}
          <App />
          <Toaster />
        </MyContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
