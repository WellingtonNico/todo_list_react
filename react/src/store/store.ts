import { configureStore } from "@reduxjs/toolkit";
import { AppSlice } from "./features/appSlice";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { TodoSlice } from "../pages/TodoListPageRedux/slice";

const store = configureStore({
  reducer: {
    app: AppSlice.reducer,
    todos: TodoSlice.reducer,
  },
});

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
