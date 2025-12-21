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
  <>
    <Navbar />

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white max-w-4xl w-full p-12 rounded-2xl shadow-xl text-center">
        
        {/* TÍTULO */}
        <h1 className="text-4xl font-extrabold text-red-700 mb-4">
          Bem-vindo(a)
        </h1>

        {/* SUBTÍTULO */}
        <p className="text-lg text-gray-600 mb-10">
          Obrigado por participar neste estudo académico sobre interação digital.
        </p>

        {/* TEXTO PRINCIPAL */}
        <div className="text-gray-700 text-base leading-relaxed space-y-5 max-w-3xl mx-auto">
          <p>
            Este protótipo web foi desenvolvido no âmbito de um estudo académico
            sobre padrões de interação dos utilizadores em ambientes digitais.
          </p>

          <p>
            A sua participação é muito importante, pois contribui para uma melhor
            compreensão de como as pessoas interagem com interfaces digitais e
            para o desenvolvimento de experiências mais claras, intuitivas e
            eficazes.
          </p>

          <p>
            A participação é simples e rápida, com uma duração aproximada de
            <strong> 2 a 3 minutos</strong>. No final, será apresentado um breve
            resultado informativo, baseado exclusivamente nas suas escolhas ao
            longo da interação.
          </p>

          <p>
            Durante a utilização da aplicação, são recolhidos dados relacionados
            com a forma como o utilizador interage com a interface. Estes dados
            são tratados de forma anónima e utilizados exclusivamente para fins
            académicos.
          </p>
        </div>

        {/* BOTÃO */}
        <div className="mt-12 mb-10">
          <button
            onClick={handleParticiparClick}
            className="bg-red-600 text-white px-12 py-4 rounded-xl text-lg font-semibold
                       hover:bg-red-700 transition-colors duration-200 shadow-md"
          >
            Iniciar Participação no Estudo
          </button>
        </div>

        {/* NOTA LEGAL */}
        <div className="border-t border-red-200 pt-6 text-sm text-gray-600 max-w-3xl mx-auto">
          <p>
            A sua participação é voluntária e anónima. Os dados recolhidos serão
            utilizados exclusivamente para fins académicos e científicos.
          </p>
        </div>
      </div>
    </div>
  </>
);

}
