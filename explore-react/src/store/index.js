import { configureStore } from "@reduxjs/toolkit";

import upcomingReducer from "../feature/upcoming/upcomingSlice";
import claimedReducer from '../feature/claimed/claimedSlice'

export const store = configureStore({
  reducer: {
    upcoming: upcomingReducer,
    claimed: claimedReducer,
  },
  // middleware: 
});
