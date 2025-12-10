import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/HomePage";
import FormularioPage from "../pages/FormularioPage";
import DashboardPage from "../pages/DashboardPage";
import ImportarCSVPage from "../pages/ImportarCSVPage";
import LoginPage from "../pages/LoginPage";

import { isAdminLoggedIn } from "../utils/auth";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/formulario" element={<FormularioPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={
            isAdminLoggedIn() ? (
              <DashboardPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/admin/importar"
          element={
            isAdminLoggedIn() ? (
              <ImportarCSVPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Rotas inválidas → redireciona para home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
