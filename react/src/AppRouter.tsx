import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import { useAppSelector } from "./store/store";

const TodoListPage = lazy(() => import("./pages/TodoListPage"));
const TodoListPageRedux = lazy(() => import("./pages/TodoListPageRedux"));

const AppRouter = () => {
  const usuario = useAppSelector((state) => state.app.usuario);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {usuario ? (
            <>
              <Route
                index
                path="/redux/"
                element={
                  <Suspense>
                    <TodoListPageRedux />
                  </Suspense>
                }
              />
              <Route
                index
                path="*"
                element={
                  <Suspense>
                    <TodoListPage />
                  </Suspense>
                }
              />
            </>
          ) : (
            <>
              <Route
                index
                path="*"
                element={
                  <Suspense>
                    <LoginPage />
                  </Suspense>
                }
              />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
