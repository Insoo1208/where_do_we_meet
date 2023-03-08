import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainColor: '#1f44a0',
  mainLight: '#6885ce'
};

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    changeColor: (state, { payload : color}) => {
      let mainColorHex = '#',
          mainLightHex = '#';
      for (const num of color[3]) {
        mainColorHex += `${num.toString(16)}`;
      };
      for (const num of color[1]) {
        mainLightHex += `${num.toString(16)}`;
      };
      console.log(mainColorHex, mainLightHex);
      state.mainColor = mainColorHex;
      state.mainLight = mainLightHex;
    },
    chooseColor: (state, { payload : colors}) => {
      state.mainColor = colors.main;
      state.mainLight = colors.light;
    }
  }
});

export const { changeColor, chooseColor } = colorSlice.actions;
export const selectColor = state => state.color;

export default colorSlice.reducer;