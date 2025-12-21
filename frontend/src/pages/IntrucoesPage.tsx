import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function IntrucoesPage() {
  const navigate = useNavigate();

  const handleIniciar = () => {
    navigate("/formulario"); // rota do teu formulário
  };

  return (
  <>
      {/* 🔹 Navbar apenas como barra (sem botões) */}
      <Navbar showActions={false} />

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white max-w-3xl w-full p-10 rounded-2xl shadow-lg">
        
        {/* TÍTULO */}
        <h1 className="text-3xl font-bold text-center text-red-600 mb-4">
          Instruções
        </h1>

        {/* TEXTO */}
        <div className="space-y-5 text-gray-700 leading-relaxed text-base">
          <p>
            Nas páginas seguintes serão apresentadas várias imagens que
            representam diferentes padrões de interação com o rato em ambientes
            digitais, com base em registos de outros utilizadores.
          </p>

          <p>
            Cada imagem mostra um padrão de interação no ecrã, resultante da
            combinação de movimentos do rato, cliques e pausas ao longo do tempo.
          </p>

          <p>
            Ao observar as imagens, tenha em atenção aspetos como:
          </p>

          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>o percurso realizado no ecrã</li>
            <li>a quantidade de desvios</li>
            <li>a continuidade ou irregularidade das linhas</li>
          </ul>

          <p>
            Em cada pergunta, deverá escolher a imagem que melhor corresponde à
            pergunta apresentada, de acordo com a sua perceção pessoal.
          </p>

          <p className="font-semibold text-gray-800">
            Não existem respostas certas ou erradas.
          </p>

          <p>
            Pedimos apenas que responda de forma honesta e com atenção,
            escolhendo a opção que lhe parece fazer mais sentido.
          </p>
        </div>

        {/* BOTÃO */}
        <div className="mt-10">
          <button
            onClick={handleIniciar}
            className="w-full bg-red-600 text-white py-3 rounded-lg text-lg font-semibold
                       hover:bg-red-700 transition-colors duration-200"
          >
            Iniciar
          </button>
        </div>
      </div>
    </div>
  </>
);
}