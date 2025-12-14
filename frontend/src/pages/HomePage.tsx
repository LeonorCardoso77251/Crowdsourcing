import Navbar from "../components/Navbar";
import { api } from "../api/api";

export default function HomePage() {

  // 🟥 Quando o utilizador clica para participar → cria utilizador + abre Forms
  const handleParticiparClick = async () => {
    console.log("➡️ Botão 'Iniciar Participação' clicado!");

    try {
      const response = await api.post("/utilizadores/anonimo");
      const userId = response.data.idUtilizador;

      localStorage.setItem("userId", userId.toString());

      const baseUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLScjLoD_w-LjrrxBQd1pepofnVggK8SE_sZg8oH9Oaxrb_0iBg/viewform";

      const entryKey = "entry.1163141320";

      const url = `${baseUrl}?usp=pp_url&${entryKey}=${encodeURIComponent(
        userId
      )}`;

      window.open(url, "_blank");

    } catch (error) {
      console.error("❌ Erro ao iniciar participação:", error);
      alert("Ocorreu um erro ao iniciar a participação. Tente novamente.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-10 flex flex-col items-center text-center">

        {/* TÍTULO */}
        <h1 className="text-4xl font-bold text-red-700 mb-6">
          Protótipo Web de Alertas e Mensagens de Suporte
        </h1>

        {/* TEXTO INTRODUTÓRIO */}
        <p className="text-gray-700 text-lg max-w-3xl mb-10">
          Este protótipo web foi desenvolvido no âmbito de um estudo académico,
          com o objetivo de recolher dados relacionados com a interação dos
          utilizadores com alertas e mensagens de suporte apresentados num
          ambiente web.
        </p>

        {/* BOTÃO PRINCIPAL */}
        <div className="mb-16">
          <button
            onClick={handleParticiparClick}
            className="bg-red-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
          >
            Iniciar Participação no Estudo
          </button>
        </div>

        {/* AVISO ÉTICO */}
        <div className="border-t border-red-200 pt-8 max-w-3xl text-sm text-gray-600">
          <p>
            A sua participação é voluntária e anónima. Os dados recolhidos serão
            utilizados exclusivamente para fins académicos e científicos, não
            sendo recolhida qualquer informação que permita a identificação
            pessoal. Poderá desistir a qualquer momento, sem qualquer prejuízo.
          </p>
        </div>

      </div>
    </div>
  );
}
