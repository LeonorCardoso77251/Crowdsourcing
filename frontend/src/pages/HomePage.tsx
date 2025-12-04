import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function HomePage() {
  // Quando o utilizador entra no site, garante que tem um ID guardado
  useEffect(() => {
    let userId = localStorage.getItem("userId");

    if (!userId) {
      if (crypto.randomUUID) {
        userId = crypto.randomUUID();
      } else {
        userId =
          Math.random().toString(36).substring(2) +
          Date.now().toString(36);
      }

      localStorage.setItem("userId", userId);
    }
  }, []);

  // Função que abre o Google Forms já com o código do participante
  const handleGoogleFormClick = () => {
    const userId = localStorage.getItem("userId") || "";

    const baseUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLScjLoD_w-LjrrxBQd1pepofnVggK8SE_sZg8oH9Oaxrb_0iBg/viewform";

    const entryKey = "entry.1163141320"; // <-- ESTE é o ID da pergunta "Código do Participante"

    const url = `${baseUrl}?usp=pp_url&${entryKey}=${encodeURIComponent(
      userId
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div>
      <Navbar />

      <div className="p-10 text-center">
        {/* Título */}
        <h1 className="text-4xl font-bold text-blue-700">Bem-vindo!</h1>

        {/* Subtítulo */}
        <p className="mt-4 text-xl text-gray-700">
          Participe da nossa pesquisa e contribua com informações.
        </p>

        {/* Botões */}
        <div className="mt-10 flex justify-center gap-6">
          {/* Botão 1 → Formulário interno */}
          <Link
            to="/formulario"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Aceder ao Formulário
          </Link>

          {/* Botão 2 → Google Forms, com código do participante */}
          <button
            onClick={handleGoogleFormClick}
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition"
          >
            Preencher Google Form
          </button>
        </div>
      </div>
    </div>
  );
}
