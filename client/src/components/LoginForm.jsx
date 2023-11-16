import { useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { API } from "../api/base";
import { useAuth } from "../context/AuthContext";

export function LoginForm() {
  const { authenticate } = useAuth();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;

    API.post("/auth/login", { username, password })
      .then(response => {
        authenticate(response.data.token);
      })
      .catch(setError);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Ім'я користувача</Form.Label>
        <Form.Control
          placeholder="Введіть ім'я користувача..."
          ref={usernameInputRef}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          placeholder="Введіть пароль..."
          ref={passwordInputRef}
        />
      </Form.Group>
      <Form.Group>
        <Button type="submit">Вхід</Button>
      </Form.Group>
      {error && (
        <Alert variant="danger" className="mt-3">
          Помилка: {error.response?.data?.message || error.message}
        </Alert>
      )}
    </Form>
  );
}
