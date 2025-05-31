import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Mocking fetchAPI and submitAPI
window.fetchAPI = (date) => {
  return Promise.resolve(["17:00", "18:00", "19:00", "20:00", "21:00"]);
};

window.submitAPI = (formData) => {
  console.log("Form submitted:", formData);
  return true; // Simulates success
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
