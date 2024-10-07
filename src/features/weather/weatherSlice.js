import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather } from "../../api/weatherApi";

const initialState = {
  weatherData: null,
  status: "idle",
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    resetWeather: (state) => {
      state.weatherData = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.weatherData = payload;
      })
      .addCase(fetchWeather.rejected, (state, { error }) => {
        state.status = "failed";
        state.error = error.message || "Failed to fetch weather data";
      });
  },
});

export const { resetWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
