import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, LoginForm, Input, Button } from "./styles";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "Pass@2024") {
      navigate("/dashboard");
    } else {
      console.log("Login falhou");
    }
  };

  return (
    <Container>
      <LoginForm>
        <h2>Login</h2>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
      </LoginForm>
    </Container>
  );
};

export default LoginPage;
