import Navbar from "../components/Navbar";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleParticiparClick = async () => {

    localStorage.removeItem("formularioId");
    localStorage.removeItem("studyActive");
    localStorage.removeItem("behaviorLogs");
    console.log("Botão 'Iniciar Participação' clicado!");

    try {
      const response = await api.post("/utilizadores/anonimo");

      const idUtilizador = response.data.idUtilizador;

      localStorage.setItem("idUtilizador", idUtilizador.toString());
      localStorage.setItem("studyActive", "true");
      localStorage.setItem("studyStartTime", Date.now().toString());

      console.log("Estudo iniciado → ID Utilizador:", idUtilizador);

      navigate("/study");

    } catch (error) {
      console.error("Erro ao iniciar participação:", error);
      alert("Ocorreu um erro ao iniciar a participação.");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="p-10 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold text-red-700 mb-6">
          Bem vindo ao Estudo de Interação Web
        </h1>

        <p className="text-gray-700 text-lg max-w-3xl mb-10">
          Este protótipo web foi desenvolvido no âmbito de um estudo académico,
          com o objetivo de recolher dados relacionados com a interação dos
          utilizadores com alertas e mensagens de suporte apresentados num
          ambiente web.
        </p>

        <div className="mb-16">
          <button
            onClick={handleParticiparClick}
            className="bg-red-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
          >
            Iniciar Participação no Estudo
          </button>
        </div>

        <div className="border-t border-red-200 pt-8 max-w-3xl text-sm text-gray-600">
          <p>
            A sua participação é voluntária e anónima. Os dados recolhidos serão
            utilizados exclusivamente para fins académicos e científicos.
          </p>
        </div>
      </div>
    </div>
  );
}
