import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedinUser: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogIn: (state, { payload:
      { firstName,
        lastName,
        id,
        nickname,
        userProfieImg,
        friends,
        authority,
        favorites,
        point
      }
    }) => {
      state.loggedinUser = {
        firstName,
        lastName,
        id,
        nickname,
        userProfieImg,
        friends,
        authority,
        favorites,
        point
      };
    },
    userLogOut: (state) => {
      state.loggedinUser = null;
    }
  }
});

export const { userLogIn, userLogOut } = userSlice.actions;
export const selectUser = state => state.user.loggedinUser;
export default userSlice.reducer;