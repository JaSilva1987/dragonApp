import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import DragonList from "./components/DragonListPage/DragonListPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dragons" element={<DragonList />} />
      </Routes>
    </Router>
  );
};

export default App;
