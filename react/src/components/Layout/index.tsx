import { Button, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { AuthApiService } from "../../data/api/services/AuthApiService";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setUsuario, toggleTheme } from "../../store/features/appSlice";

const Layout = () => {
  const { usuario } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();

  return (
    <Container className="pt-5">
      <Outlet />
      {usuario && (
        <div className="footer fixed-bottom bg-dark text-white p-3">
          <div className="d-flex justify-content-end gap-2">
            <Link to="/redux/">List With Redux</Link>
            <Link to="/">List With Context Manager</Link>
            <Button onClick={() => dispatch(toggleTheme())} variant="secondary">
              Change theme
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                AuthApiService.logout().then(() =>
                  dispatch(setUsuario(undefined))
                )
              }
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Layout;
