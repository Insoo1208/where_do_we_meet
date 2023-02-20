import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";

// 전역 state를 보관하는 저장소 만들기
export const store = configureStore({
  reducer: {
    user: userReducer,
  }
});