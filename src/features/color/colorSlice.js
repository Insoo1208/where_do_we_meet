import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  colorHex: '#1f44a0'
};

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    changeColor: (state, action) => {
      state.colorHex = action.payload;
    }
  }
});

export const { changeColor } = colorSlice.actions;
export const selectColor = state => state.color.colorHex;

export default colorSlice.reducer;