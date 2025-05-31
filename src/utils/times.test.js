// times.test.js

import { initializeTimes, updateTimes } from './times';

describe('initializeTimes', () => {
  beforeEach(() => {
    global.fetchAPI = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns available times from fetchAPI', async () => {
    const date = '2025-06-01';
    const mockTimes = ["17:00", "18:00", "19:00"];

    global.fetchAPI.mockResolvedValue(mockTimes);

    const times = await initializeTimes(date);

    expect(global.fetchAPI).toHaveBeenCalledWith(date);
    expect(times).toEqual(mockTimes);
  });

  it('throws error if fetchAPI is not defined', async () => {
    delete global.fetchAPI;

    await expect(initializeTimes('2025-06-01')).rejects.toThrow('fetchAPI is not defined');
  });
});

describe('updateTimes reducer', () => {
  it('should update times when receiving SET_TIMES action', () => {
    const initialState = [];
    const action = { type: 'SET_TIMES', times: ["17:00", "18:00", "19:00"] };

    const newState = updateTimes(initialState, action);

    expect(newState).toEqual(action.times);
  });

  it('should return previous state for unknown action type', () => {
    const initialState = ["12:00"];
    const action = { type: 'UNKNOWN_ACTION' };

    const newState = updateTimes(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
