import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useBehavioralTracking } from "../hooks/useBehavioralTracking";


console.log("ESTE É O FormularioPage.tsx REAL");

import { useState, useEffect } from "react";
import { api, criarFormulario } from "../api/api";

export default function FormularioPage() {
  useBehavioralTracking();
  const navigate = useNavigate();


  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImage2, setSelectedImage2] = useState<string | null>(null);
  const [selectedImage3, setSelectedImage3] = useState<string | null>(null);

  useEffect(() => {
    const iniciar = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Erro: não foi encontrado um ID válido. Volte à página inicial.");
        return;
      }

      let formId = localStorage.getItem("formularioId");

      if (!formId) {
        const form = await criarFormulario(userId);
        formId = String(form.idFormulario);
        localStorage.setItem("formularioId", formId);
      }
    };

    iniciar();
  }, []);

 const enviarRespostas = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const formId = localStorage.getItem("formularioId");

    console.log("📤 A enviar respostas para o backend");
    console.log("idUtilizador:", userId);
    console.log("idFormulario:", formId);
    console.log("resposta1:", selectedImage);
    console.log("resposta2:", selectedImage2);
    console.log("resposta3:", selectedImage3);

    if (!userId || !formId) {
      alert("Erro: IDs não encontrados. Atualize a página.");
      return;
    }

    const dadosParaEnviar = {
      resposta1: selectedImage,
      resposta2: selectedImage2,
      resposta3: selectedImage3,
      idUtilizador: Number(userId),
      idFormulario: Number(formId),
    };

    // 1️⃣ Enviar respostas
    await api.post("/respostas", dadosParaEnviar);
    console.log("✅ POST /respostas concluído com sucesso");

    // 2️⃣ FLUSH dos logs comportamentais (tipado, sem any)
    const w = window as unknown as {
      userLog?: {
        processResults: () => void;
      };
    };

if (w.userLog) {
  w.userLog.processResults();
  console.log("🧠 Logs comportamentais flushados");
}

// ⏱️ dar tempo ao processData para gravar no localStorage
setTimeout(() => {
  navigate("/avaliacao");
}, 0);


  } catch (error) {
    console.error("❌ Erro ao enviar respostas:", error);
    alert("Erro ao enviar respostas");
  }
};



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

  return (
    <div>
      <Navbar />

      <div className="p-8 max-w-14xl mx-auto">

        <h1 className="text-3xl font-bold text-red-700 mb-6">Questionário</h1>

        {/* INSTRUÇÕES */}
        <div className="bg-red-50 border border-red-300 p-4 rounded-lg mb-8">
          <p className="text-gray-700">
            <strong>Instruções:</strong> Observe atentamente as imagens
            apresentadas e escolha a que considera mais adequada a cada
            questão.
          </p>
        </div>

        {/* PERGUNTA 1 */}
        <div className="bg-red-50 border border-red-300 p-6 rounded-lg shadow-sm mb-8">

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
        

    className={`border rounded-lg p-4 cursor-pointer transition aspect-[3/4] min-h-[900px] flex items-center justify-center ${


                  selectedImage === img
                    ? "border-red-600 shadow-md"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              >
<img
  src={img}
  alt={`opcao-${index}`}
  className="max-w-full max-h-full object-contain rounded transition-transform duration-300 hover:scale-125"
/>




              </div>
            ))}
          </div>
        </div>

        {/* PERGUNTA 2 */}
       <div className="bg-red-50 border border-red-300 p-6 rounded-lg shadow-sm mb-8">

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
                className={`border rounded-lg p-4 cursor-pointer transition aspect-[3/4] min-h-[900px] flex items-center justify-center ${
                  selectedImage2 === img
                    ? "border-red-600 shadow-md"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage2(img)}
              >
<img
  src={img}
  alt={`opcao-${index}`}
  className="max-w-full max-h-full object-contain rounded transition-transform duration-300 hover:scale-125"
/>


              </div>
            ))}
          </div>
        </div>

        {/* PERGUNTA 3 */}
        <div className="bg-red-50 border border-red-300 p-6 rounded-lg shadow-sm mb-8">

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
                className={`border rounded-lg p-2 cursor-pointer transition ${
                  selectedImage3 === img
                    ? "border-red-600 shadow-md"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage3(img)}
              >
<img
  src={img}
  alt={`opcao-${index}`}
  className="max-w-full max-h-full object-contain rounded transition-transform duration-300 hover:scale-125"
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
