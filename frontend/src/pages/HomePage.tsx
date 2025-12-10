import Navbar from "../components/Navbar";
import { api } from "../api/api";

export default function HomePage() {

  // 🟦 Quando o utilizador clica para participar → cria utilizador + abre Forms
  const handleParticiparClick = async () => {
    console.log("➡️ Botão 'Participar' clicado!");

    try {
      // 1️⃣ Criar utilizador no backend
      console.log("📡 A criar utilizador anónimo no backend...");
      const response = await api.post("/utilizadores/anonimo");
      const userId = response.data.idUtilizador;

      // 2️⃣ Guardar localmente
      localStorage.setItem("userId", userId.toString());
      console.log("✅ Utilizador criado! ID =", userId);

      // 3️⃣ Abrir Google Forms com o ID
      const baseUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLScjLoD_w-LjrrxBQd1pepofnVggK8SE_sZg8oH9Oaxrb_0iBg/viewform";

      const entryKey = "entry.1163141320"; // campo oculto do Forms

      const url = `${baseUrl}?usp=pp_url&${entryKey}=${encodeURIComponent(
        userId
      )}`;

      console.log("🔗 A abrir Google Forms com URL:", url);
      window.open(url, "_blank");

    } catch (error) {
      console.error("❌ Erro ao criar utilizador:", error);
      alert("Ocorreu um erro ao iniciar a participação.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-10 text-center">

        {/* Título */}
        <h1 className="text-4xl font-bold text-blue-700">
          Bem-vindo ao Estudo!
        </h1>

        {/* Subtítulo */}
        <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto">
          Para participar, clique no botão abaixo. Irá primeiro preencher um
          formulário inicial e depois continuará o estudo no nosso site.
        </p>

        {/* Botão principal */}
        <div className="mt-12">
          <button
            onClick={handleParticiparClick}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition"
          >
            Participar no Estudo
          </button>
        </div>
      </div>
    </div>
  );
}
