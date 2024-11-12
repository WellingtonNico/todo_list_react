import { useEffect } from "react";
import AppRouter from "./AppRouter";
import { useAppDispatch } from "./store/store";
import { AuthApiService } from "./data/api/services/AuthApiService";
import {
  setTheme,
  setUsuario,
  setWindowWidth,
  ThemeOptions,
} from "./store/features/appSlice";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setWindowWidth(window.innerWidth));
    window.addEventListener("resize", () => {
      dispatch(setWindowWidth(window.innerWidth));
    });
    const theme = localStorage.getItem("theme") || "light";
    dispatch(setTheme(theme as ThemeOptions));
    AuthApiService.getUser().then((usuario) => dispatch(setUsuario(usuario)));
  }, [dispatch]);
  return <AppRouter />;
};

export default App;
