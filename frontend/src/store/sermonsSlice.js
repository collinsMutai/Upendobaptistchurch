import { createSlice } from "@reduxjs/toolkit";
import sermons from "./data/sermons";

const initialState = {
  list: sermons, // preloaded for testing
};
const sermonsSlice = createSlice({
  name: "sermons",
  initialState,
  reducers: {
    setSermons: (state, action) => {
      state.list = action.payload;
    },
    addSermon: (state, action) => {
      state.list.push(action.payload);
    },
    updateSermon: (state, action) => {
      const index = state.list.findIndex(s => s.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    removeSermon: (state, action) => {
      state.list = state.list.filter(s => s.id !== action.payload);
    },
  },
});

export const { setSermons, addSermon, updateSermon, removeSermon } = sermonsSlice.actions;
export default sermonsSlice.reducer;
