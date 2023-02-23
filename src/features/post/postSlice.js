import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: []
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action) => {
      
    }
  }
});

export default postSlice.reducer;