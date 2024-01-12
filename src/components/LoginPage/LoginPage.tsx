import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, LoginForm, Input, Button } from "./styles";

interface LoginPageProps {
  onLogin: () => void;
  authenticated: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, authenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "Pass@2024") {
      console.log("Login bem-sucedido");
      onLogin(); // Chama o método de login bem-sucedido
      navigate("/dragons");
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
