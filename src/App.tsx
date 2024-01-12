import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import DragonListPage from "./components/DragonListPage/DragonListPage";

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    // Substitua esta lógica pela sua lógica de autenticação real
    // Se o login for bem-sucedido, chame setAuthenticated(true)
    // Caso contrário, mantenha setAuthenticated(false)
    setAuthenticated(true); // Exemplo: Login bem-sucedido
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage onLogin={handleLogin} authenticated={authenticated} />
          }
        />
        <Route
          path="/dragons"
          element={
            authenticated ? (
              <DragonListPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
