import { useLoginForm } from "./useLoginForm.hook";
import { Form, Button } from "react-bootstrap";

export const LoginForm = () => {
  const { username, setUsername, password, setPassword, handleLogin } =
    useLoginForm();

  return (
    <>
      <Form className="login-form" onSubmit={handleLogin}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
      <br />
    </>
  );
};
