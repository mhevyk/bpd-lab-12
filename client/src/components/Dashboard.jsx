import { Button, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { UsersButton } from "./UsersButton";

export function Dashboard() {
  const { token, logout } = useAuth();

  return (
    <Container>
      <p>Поточний користувач має токен: {token}</p>
      <UsersButton />
      <Button variant="danger" onClick={() => logout()}>
        Вихід
      </Button>
    </Container>
  );
}
