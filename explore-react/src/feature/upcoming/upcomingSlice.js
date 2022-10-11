import { createSlice } from "@reduxjs/toolkit";

import { data } from "../../utils/datainit";

const initialState = {
  allData: [],
  upcomingItems: [],
  isLoading: true,
};

const addDataUpcoming = (state, payload) => {
  return [...state.upcomingItems, payload];
};

const addAllData = (state, payload) => {
  return [...state.allData, payload];
};

const updateDataUpcoming = (state, payload) => {
  const update = state.upcomingItems.map((obj) => {
    if (obj.id === payload.id) {
      return {
        ...obj,
        claimed: true,
        total_claim: obj.total_claim + 1,
      };
    }
    return obj;
  });
  return update;
};

const upcomingSlice = createSlice({
  name: "upcoming",
  initialState: initialState,
  reducers: {
    insertItem: (state, { payload }) => {
      state.upcomingItems = addDataUpcoming(state, payload);
      state.allData = addAllData(state, payload);
    },
    updateItem: (state, { payload }) => {
      state.upcomingItems = updateDataUpcoming(state, payload);
      state.allData = state.allData.map((obj) => {
        if (obj.id === payload.id) {
          return {
            ...obj,
            claimed: true,
            total_claim: obj.total_claim + 1,
          };
        }
        return obj;
      });
    },
    updateData: (state, { payload }) => {
      
      state.allData = state.allData.map((obj) => {
        if (obj.id == payload.id) {
          return {
            ...obj,
            name: payload.name,
            image_url: payload.image_url,
            desc: payload.desc,
            countdown: {
              start: payload.countdown.start,
              end: payload.countdown.end
            },
            endtime: payload.endtime
          };
        }
        return obj;
      })

      state.upcomingItems = state.upcomingItems.map((obj) => {
        if (obj.id == payload.id) {
          return {
            ...obj,
            name: payload.name,
            image_url: payload.image_url,
            desc: payload.desc,
            countdown: {
              start: payload.countdown.start,
              end: payload.countdown.end,
            },
            endtime: payload.endtime,
          };
        }
        return obj;
      });
    },
    updateEndTimeAllData: (state, { payload }) => {
      state.allData = state.allData.map((obj) => {
        if (obj.id === payload.id) {
          return {
            ...obj,
            endtime: true,
          };
        }
        return obj;
      });
      state.upcomingItems = state.upcomingItems.map((obj) => {
        if (obj.id === payload.id) {
          return {
            ...obj,
            endtime: true,
          };
        }
        return obj;
      });
    },
    deleteItem: (state, action) => {},
  },
});

export const {
  deleteItem,
  insertItem,
  updateItem,
  updateData,
  updateEndTimeAllData,
} = upcomingSlice.actions;
export default upcomingSlice.reducer;
