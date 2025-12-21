import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/HomePage";
import IntrucoesPage from "../pages/IntrucoesPage"; // 👈 NOVA PÁGINA
import FormularioPage from "../pages/FormularioPage";
import AvaliacaoPage from "../pages/AvaliacaoPage"; // 
import DashboardPage from "../pages/DashboardPage";
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
                {/* 🔹 Nova página de instruções */}
        <Route path="/instrucoes" element={<IntrucoesPage />} />
        <Route path="/formulario" element={<FormularioPage />} />
        <Route path="/avaliacao" element={<AvaliacaoPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route
        path="/dashboard/behavioral"
        element={<BehavioralDashboardPage />}
/>
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
