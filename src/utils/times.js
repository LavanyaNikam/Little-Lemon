// times.js

// Reducer to update available times
export const updateTimes = (state, action) => {
  if (action.type === 'SET_TIMES') {
    return action.times;
  }
  return state;
};

// Function to initialize times by fetching from API
export const initializeTimes = async (date) => {
  if (typeof global.fetchAPI !== 'function') {
    throw new Error('fetchAPI is not defined');
  }
  const times = await global.fetchAPI(date);
  return times;
};
