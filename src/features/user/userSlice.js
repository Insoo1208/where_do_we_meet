import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedinUser: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogIn: (state, action) => {
      state.loggedinUser = action.payload;
    },
    userLogOut: (state) => {
      state.loggedinUser = null;
    }
  }
});

export const { userLogIn, userLogOut } = userSlice.actions;
export const selectUser = state => state.user.loggedinUser;
export default userSlice.reducer;