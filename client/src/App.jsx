import { Container, Tab, Tabs } from "react-bootstrap";
import { LoginForm } from "./components/LoginForm";
import { RegistrationForm } from "./components/RegistrationForm";
import { useAuth } from "./context/AuthContext";
import { Dashboard } from "./components/Dashboard";
import { UsersButton } from "./components/UsersButton";

export function App() {
  const { token } = useAuth();

  return token ? (
    <Dashboard />
  ) : (
    <Container className="m-3">
      <Tabs defaultActiveKey="login" className="mb-3">
        <Tab eventKey="login" title="Логін">
          <LoginForm />
        </Tab>
        <Tab eventKey="registration" title="Реєстрація">
          <RegistrationForm />
        </Tab>
        <Tab eventKey="users" title="Отримати користувачів">
          <UsersButton />
        </Tab>
      </Tabs>
    </Container>
  );
}
