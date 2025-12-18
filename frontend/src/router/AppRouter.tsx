import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/HomePage";
import FormularioPage from "../pages/FormularioPage";
import AvaliacaoPage from "../pages/AvaliacaoPage"; // 🔴 NOVO
import DashboardPage from "../pages/DashboardPage";
import ImportarCSVPage from "../pages/ImportarCSVPage";
import LoginPage from "../pages/LoginPage";
import StudyForm from "../pages/StudyForm";
import BehavioralDashboardPage from "../pages/BehavioralDashboardPage";

import { isAdminLoggedIn } from "../utils/auth";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/study" element={<StudyForm />} />
        <Route path="/formulario" element={<FormularioPage />} />
        <Route path="/avaliacao" element={<AvaliacaoPage />} /> {/* 🔴 NOVA */}
        <Route path="/login" element={<LoginPage />} />
        <Route
  path="/dashboard/behavioral"
  element={<BehavioralDashboardPage />}
/>


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
