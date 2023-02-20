import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  }
});

export default userSlice.reducer;