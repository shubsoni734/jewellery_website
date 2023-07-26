import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/Auth";
import { SearchProvider } from "./Context/Search";
import { CartProvider } from "./Context/Cart";
import { BillProvider } from "./Context/OrderDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BillProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BillProvider>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);

reportWebVitals();
