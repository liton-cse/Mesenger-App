import { configureStore } from "@reduxjs/toolkit";
import userSearchReducer from "../feature/user/userSearchSlice";
import LoginReducer from "../feature/auth/loginSlice";
import messagesReducer from "../feature/messenger/messageSlice";
import chatReducer from "../feature/messenger/chatSlice";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
export const store = configureStore({
  reducer: {
    loginAuth: LoginReducer,
    search: userSearchReducer,
    messages: messagesReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
