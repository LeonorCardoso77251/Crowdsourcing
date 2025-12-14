import { useState } from "react";
import { api } from "../api/api";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const entrar = async () => {
    try {
      const response = await api.post("/admin/login", {
        username,
        password
      });

      if (response.data === true) {
        const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hora

        localStorage.setItem("admin", "true");
        localStorage.setItem("admin_expires_at", expiresAt.toString());

        window.location.href = "/dashboard";
      } else {
        setErro("Credenciais inválidas");
      }
    } catch (e) {
      console.error("Erro no login:", e);
      setErro("Erro ao conectar ao servidor");
    }
  };

  return (
    <>
      {/* 🔴 Navbar */}
      <Navbar />

      {/* CONTEÚDO */}
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-gray-50">
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md text-center">

          <h1 className="text-3xl font-bold mb-6 text-red-700">
            Login Administrador
          </h1>

          <input
            className="border p-3 mb-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Utilizador"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="border p-3 mb-6 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={entrar}
            className="bg-red-600 text-white px-6 py-3 rounded w-full font-semibold hover:bg-red-700 transition"
          >
            Entrar
          </button>

          {erro && (
            <p className="text-red-600 mt-4 font-medium">
              {erro}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
