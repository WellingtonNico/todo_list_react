import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeOptions = "dark" | "light";

interface AppState {
  usuario?: Usuario;
  theme: ThemeOptions;
  windowWidth: number;
}

export const AppSlice = createSlice({
  name: "app",
  initialState: {
    usuario: undefined,
    theme: "light",
    windowWidth: 0,
  } as AppState,
  reducers: {
    setUsuario: (state, action: PayloadAction<Usuario | undefined>) => {
      state.usuario = action.payload;
    },
    setTheme: (state, action: PayloadAction<ThemeOptions>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
      document.body.setAttribute("data-bs-theme", action.payload);
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      AppSlice.caseReducers.setTheme(state, {
        payload: newTheme,
        type: "string",
      });
    },
    setWindowWidth: (state, action: PayloadAction<number>) => {
      state.windowWidth = action.payload;
    },
  },
});

export const { setUsuario, setTheme, setWindowWidth, toggleTheme } =
  AppSlice.actions;

export default AppSlice.reducer;
