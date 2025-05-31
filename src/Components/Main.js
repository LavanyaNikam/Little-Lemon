import React, { useReducer, useEffect } from "react"; // ✅ Added useEffect here
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import BookingPage from "./BookingPage";
import ConfirmedBooking from "./ConfirmedBooking"; // ✅ Import
import { useNavigate } from 'react-router-dom';

// Reducer function to update available times
const updateTimes = (state, action) => {

  if (action.type === "SET_TIMES") {
    return action.times;
  }
  return state;
};

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, []);
    const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (window.fetchAPI) {
      window.fetchAPI(today).then((times) => {
        dispatch({ type: "SET_TIMES", times });
      });
    }
  }, []);

 // ✅ Step 2: Define submitForm function
  const submitForm = (formData) => {
    const success = window.submitAPI(formData);
    if (success) {
      navigate("/confirmed"); // Redirect to confirmation page
    }
  };


  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/booking"
          element={<BookingPage availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm}/>}
        />
                <Route path="/confirmed" element={<ConfirmedBooking />} /> {/* ✅ Route added */}

      </Routes>
    </main>
  );
}

export default Main;
