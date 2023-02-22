import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    firstName: "Insoo", 
    lastName: "Jeon", 
    id: "",
    password: "",
    email: "",
    nickname: "",
    adress: "",
    friends: [
      "id1", "id2"
    ],
    authority: "admin",
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  }
});

export default userSlice.reducer;