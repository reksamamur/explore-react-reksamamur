import { createSlice } from "@reduxjs/toolkit";

import { dataClaimed } from "../../utils/datainit";

const initialState = {
  claimedItems: dataClaimed,
  isLoading: true,
};

const addDataClaimed = (state, payload) => {
  return [...state.claimedItems, payload];
};

const updateClaim = (state, payload) => {
  const update = state.claimedItems.map((obj) => {
    if (obj.id === payload.id) {
      return {
        ...obj,
        total_claim: obj.total_claim + 1,
      };
    }
    return obj;
  });
  return update;
};

const claimedSlice = createSlice({
  name: "claimed",
  initialState: initialState,
  reducers: {
    insertItem: (state, { payload }) => {
      state.claimedItems = addDataClaimed(state, payload);
    },
    updateItem: (state, { payload }) => {
      state.claimedItems = updateClaim(state, payload)
    },
    deleteItem: (state, action) => {},
  },
});

export const { deleteItem, insertItem, updateItem } = claimedSlice.actions;
export default claimedSlice.reducer;
