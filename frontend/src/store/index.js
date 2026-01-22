import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./eventsSlice";
import sermonsReducer from "./sermonsSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    sermons: sermonsReducer,
  },
});
