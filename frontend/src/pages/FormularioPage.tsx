import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useBehavioralTracking } from "../hooks/useBehavioralTracking";
import { useState, useEffect } from "react";
import { api, criarFormulario } from "../api/api";
import { useRef } from "react";


console.log("ESTE É O FormularioPage.tsx REAL");

export default function FormularioPage() {
  useBehavioralTracking();
  const navigate = useNavigate();

  // 🔑 Identidade única do utilizador
  const idUtilizador = localStorage.getItem("idUtilizador");
  const codigoParticipante = localStorage.getItem("codigoParticipante");
  const formularioCriadoRef = useRef(false);


  console.log("Utilizador ativo:", idUtilizador, codigoParticipante);

  // =============================
  // Estados das respostas
  // =============================
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImage2, setSelectedImage2] = useState<string | null>(null);
  const [selectedImage3, setSelectedImage3] = useState<string | null>(null);

  // =============================
  // Criar / obter formulário
  // =============================
  useEffect(() => {
  const iniciarFormulario = async () => {
    if (formularioCriadoRef.current) return;

    if (!idUtilizador) {
      alert("Erro: utilizador não encontrado.");
      return;
    }

    let formularioId = localStorage.getItem("formularioId");

    if (!formularioId) {
      formularioCriadoRef.current = true;

      const form = await criarFormulario(idUtilizador);
      formularioId = String(form.idFormulario);
      localStorage.setItem("formularioId", formularioId);

      console.log("📄 Formulário criado → ID:", formularioId);
    }
  };

  iniciarFormulario();
}, [idUtilizador]);


  // =============================
  // Enviar respostas
  // =============================
  const enviarRespostas = async () => {
    try {
      const formularioId = localStorage.getItem("formularioId");

      if (!idUtilizador || !formularioId) {
        alert("Erro: IDs em falta. Atualize a página.");
        return;
      }

      console.log("📤 A enviar respostas para o backend");
      console.log("idUtilizador:", idUtilizador);
      console.log("idFormulario:", formularioId);
      console.log("resposta1:", selectedImage);
      console.log("resposta2:", selectedImage2);
      console.log("resposta3:", selectedImage3);

      const dadosParaEnviar = {
        resposta1: selectedImage,
        resposta2: selectedImage2,
        resposta3: selectedImage3,
        idUtilizador: Number(idUtilizador),
        idFormulario: Number(formularioId),
      };

      // 1️⃣ Enviar respostas
      await api.post("/respostas", dadosParaEnviar);
      console.log("✅ POST /respostas concluído com sucesso");

      // 2️⃣ Flush dos logs comportamentais
      const w = window as unknown as {
        userLog?: {
          processResults: () => void;
        };
      };

      if (w.userLog) {
        w.userLog.processResults();
        console.log("🧠 Logs comportamentais flushados");
      }

      // 3️⃣ Avançar para a avaliação
      navigate("/avaliacao");

    } catch (error) {
      console.error("❌ Erro ao enviar respostas:", error);
      alert("Erro ao enviar respostas.");
    }
  };

  // =============================
  // Imagens
  // =============================
  const imagens = [
    "/img/img1.png",
    "/img/img2.png",
    "/img/img3.png",
    "/img/img4.png",
    "/img/img5.png",
    "/img/img6.png",
  ];

  const imagensPergunta2 = [
    "/img/img4.png",
    "/img/img1.png",
    "/img/img6.png",
    "/img/img2.png",
    "/img/img5.png",
    "/img/img3.png",
  ];

  const imagensPergunta3 = [
    "/img/img2.png",
    "/img/img5.png",
    "/img/img1.png",
    "/img/img6.png",
    "/img/img3.png",
    "/img/img4.png",
  ];

  // =============================
  // Render
  // =============================
  return (
    <div>
      <Navbar />

      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-red-700 mb-6">
          Questionário
        </h1>

        {/* INSTRUÇÕES */}
        <div className="bg-red-50 border border-red-300 p-4 rounded-lg mb-8">
          <p className="text-gray-700">
            <strong>Instruções:</strong> Observe atentamente as imagens
            apresentadas e escolha a que considera mais adequada a cada
            questão.
          </p>
        </div>

        {/* PERGUNTA 1 */}
        <div className="bg-red-50 border border-red-300 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Pergunta 1 – Identificação da imagem com maior mobilidade
          </h2>

          <p className="mb-4">
            Qual destas imagens considera que representa maior mobilidade?
          </p>

          <div className="grid grid-cols-2 gap-4">
            {imagens.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`border rounded-lg p-4 cursor-pointer transition aspect-[3/4] min-h-[400px] flex items-center justify-center ${
                  selectedImage === img
                    ? "border-red-600 shadow-md"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`opcao-${index}`}
                  className="max-w-full max-h-full object-contain rounded hover:scale-105 transition"
                />
              </div>
            ))}
          </div>
        </div>

        {/* PERGUNTA 2 */}
        <div className="bg-red-50 border border-red-300 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Pergunta 2 – Autoavaliação de movimento
          </h2>

          <p className="mb-4">
            Qual das imagens considera que melhor representa o seu movimento?
          </p>

          <div className="grid grid-cols-2 gap-4">
            {imagensPergunta2.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage2(img)}
                className={`border rounded-lg p-4 cursor-pointer transition aspect-[3/4] min-h-[400px] flex items-center justify-center ${
                  selectedImage2 === img
                    ? "border-red-600 shadow-md"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`opcao-${index}`}
                  className="max-w-full max-h-full object-contain rounded hover:scale-105 transition"
                />
              </div>
            ))}
          </div>
        </div>

        {/* PERGUNTA 3 */}
        <div className="bg-red-50 border border-red-300 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Pergunta 3 – Perceção habitual do movimento
          </h2>

          <p className="mb-4">
            Respondendo com honestidade, qual das imagens considera que representa
            a forma como normalmente movimenta o seu rato no computador?
          </p>

          <div className="grid grid-cols-2 gap-4">
            {imagensPergunta3.map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage3(img)}
                className={`border rounded-lg p-4 cursor-pointer transition aspect-[3/4] min-h-[400px] flex items-center justify-center ${
                  selectedImage3 === img
                    ? "border-red-600 shadow-md"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`opcao-${index}`}
                  className="max-w-full max-h-full object-contain rounded hover:scale-105 transition"
                />
              </div>
            ))}
          </div>
        </div>

        {/* BOTÃO */}
        <div className="mt-8">
          <button
            disabled={!selectedImage || !selectedImage2 || !selectedImage3}
            onClick={enviarRespostas}
            className={`px-6 py-3 text-white rounded-lg ${
              selectedImage && selectedImage2 && selectedImage3
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-400"
            }`}
          >
            Enviar respostas
          </button>
        </div>
      </div>
    </div>
  );
}
