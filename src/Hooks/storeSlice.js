import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMode: false,
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setIsMode: (state, action) => {
      state.isMode = action.payload;
    },
  },
});

export default storeSlice.reducer;
export const { setIsMode } = storeSlice.actions;