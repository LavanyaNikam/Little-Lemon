import React, { useState, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // <-- Import useNavigate
import { validateForm } from '../utils/Validation'; // Adjust path if needed

// Reducer to update available times
const updateTimes = (state, action) => {
  if (action.type === 'SET_TIMES') {
    console.log('Reducer updating times:', action.times);
    return action.times;
  }
  return state;
};

const BookingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    guests: '',
    occasion: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [availableTimes, dispatch] = useReducer(updateTimes, []);

  // Initialize date on mount
 useEffect(() => {
  const fetchInitialTimes = async () => {
    const today = new Date().toISOString().split('T')[0];
    if (window.fetchAPI) {
      try {
        const times = await window.fetchAPI(today);
        console.log('Times from fetchAPI:', times);
        dispatch({ type: 'SET_TIMES', times });
        setFormData((prev) => ({ ...prev, date: today }));
      } catch (error) {
        console.error('Error fetching initial times:', error);
      }
    } else {
      console.log('fetchAPI is not available on window');
    }
  };

  fetchInitialTimes();
}, []);


  // Fetch available times whenever the date changes
  useEffect(() => {
  const fetchTimes = async (date) => {
    console.log('Fetching times for date:', date);
    if (window.fetchAPI) {
      try {
        const times = await window.fetchAPI(date);
        console.log('Times fetched:', times);
        dispatch({ type: 'SET_TIMES', times });
      } catch (error) {
        console.error('Error fetching times:', error);
        dispatch({ type: 'SET_TIMES', times: [] });
      }
    } else {
      console.warn('fetchAPI not found on window');
      dispatch({ type: 'SET_TIMES', times: [] });
    }
  };

  if (formData.date) {
    fetchTimes(formData.date);
  }
}, [formData.date]);



  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'date') {
      // When date changes, reset time to empty string
      const updatedForm = { ...formData, date: value, time: '' };
      setFormData(updatedForm);
      setIsFormValid(validateForm(updatedForm));
      return;
    }

    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    setIsFormValid(validateForm(updatedForm));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!isFormValid) return;
  if (window.submitAPI) {
    const success = await window.submitAPI(formData);
    if (success) {
navigate('/confirmed');

      const today = new Date().toISOString().split('T')[0];
      setFormData({
        name: '',
        date: today,
        time: '',
        guests: '',
        occasion: ''
      });

      if (window.fetchAPI) {
        const times = await window.fetchAPI(today);
        dispatch({ type: 'SET_TIMES', times });
      }

      setIsFormValid(false);
    } else {
      alert('Failed to submit the form. Please try again.');
    }
  } else {
    alert('submitAPI function not found.');
  }
};



  // Debug log to see times on every render
  console.log('Rendering BookingPage, availableTimes:', availableTimes);

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Full Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <label htmlFor="time">Time:</label>
      <select
        id="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      >
        <option value="">Select</option>
        {availableTimes.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>

      <label htmlFor="guests">Number of Guests:</label>
      <input
        type="number"
        id="guests"
        name="guests"
        min="1"
        max="20"
        value={formData.guests}
        onChange={handleChange}
        required
      />

      <label htmlFor="occasion">Occasion:</label>
      <select
        id="occasion"
        name="occasion"
        value={formData.occasion}
        onChange={handleChange}
        required
      >
        <option value="">Select</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
        <option value="Other">Other</option>
      </select>

      <button type="submit" disabled={!isFormValid}>
        Book Table
      </button>
    </form>
  );
};

export default BookingPage;
