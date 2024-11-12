import { AuthApiService } from "../../data/api/services/AuthApiService";
import { Button, Form } from "react-bootstrap";
import { setUsuario } from "../../store/features/appSlice";
import { useAppDispatch } from "../../store/store";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    AuthApiService.login(
      formData.get("username") as string,
      formData.get("password") as string
    )
      .then((response) => {
        dispatch(setUsuario(response.user));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          type="email"
          placeholder="Your e-mail address"
          name="username"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Your password"
          name="password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginPage;
