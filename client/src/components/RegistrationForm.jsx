import { useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { API } from "../api/base";
import { useAuth } from "../context/AuthContext";

export function RegistrationForm() {
  const { authenticate } = useAuth();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordRepeatInputRef = useRef();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;
    const repeatedPassword = passwordRepeatInputRef.current.value;

    if (password !== repeatedPassword) {
      return setError(new Error("Паролі різні"));
    }

    API.post("/auth/registration", { username, password })
      .then(response => {
        authenticate(response.data.token);
        setError(null);
        setIsSuccess(true);
      })
      .catch(error => {
        setError(error);
        setIsSuccess(false);
      });
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
      <Form.Group className="mb-3">
        <Form.Label>Повторіть пароль</Form.Label>
        <Form.Control
          type="password"
          placeholder="Введіть пароль ще раз..."
          ref={passwordRepeatInputRef}
        />
      </Form.Group>
      <Form.Group>
        <Button type="submit">Вхід</Button>
      </Form.Group>
      {isSuccess && (
        <Alert variant="success">
          Користувач був успішно зареєстрований! Виконайте вхід
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="mt-3">
          Помилка: {error.response?.data?.message || error.message}
          {error.response?.data?.errors && (
            <ul>
              {error.response?.data?.errors.map(error => (
                <li key={error.msg}>{error.msg}</li>
              ))}
            </ul>
          )}
        </Alert>
      )}
    </Form>
  );
}
