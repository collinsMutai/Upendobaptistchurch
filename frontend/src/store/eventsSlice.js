import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  list: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.list = action.payload;
    },
    addEvent: (state, action) => {
      state.list.push(action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.list.findIndex(e => e.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    removeEvent: (state, action) => {
      state.list = state.list.filter(e => e.id !== action.payload);
    },
  },
});

export const { setEvents, addEvent, updateEvent, removeEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
