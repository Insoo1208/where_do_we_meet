import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      
    }
  }
});

export default userSlice.reducer;