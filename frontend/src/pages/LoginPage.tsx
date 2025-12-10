import { useState } from "react";
import { api } from "../api/api";

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
        const expiresAt = Date.now() + 60 * 60 * 1000; // sessão válida por 1 hora

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
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Login Administrador</h1>

      <input
        className="border p-2 mb-3 rounded"
        placeholder="Utilizador"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="border p-2 mb-3 rounded block mx-auto"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={entrar}
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Entrar
      </button>

      {erro && <p className="text-red-600 mt-4">{erro}</p>}
    </div>
  );
}
