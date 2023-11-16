import { Alert, Button } from "react-bootstrap";
import { API } from "../api/base";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function UsersButton() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  function fetchUsers() {
    API.get("/auth/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => setUsers(response.data))
      .catch(setError);
  }
  return (
    <>
      <Button onClick={fetchUsers}>Отримати список користувачів</Button>
      {users && (
        <ul>
          {users.map(user => (
            <li key={user.username}>{user.username}</li>
          ))}
        </ul>
      )}
      {error && (
        <Alert variant="danger">
          {error.response?.data?.message || error.message}
        </Alert>
      )}
    </>
  );
}
