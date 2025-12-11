import Navbar from "../components/Navbar";
console.log("ESTE É O FormularioPage.tsx REAL");

import { useState, useEffect } from "react";
import { api, criarFormulario } from "../api/api";

export default function FormularioPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImage2, setSelectedImage2] = useState<string | null>(null);
  const [selectedImage3, setSelectedImage3] = useState<string | null>(null); // 🔵 NOVO

  // 🟦 AO ABRIR A PÁGINA → usar userId do localStorage + criar formulário
  useEffect(() => {
    const iniciar = async () => {
      console.log("🟡 UseEffect a correr!");

      // ===== UTILIZADOR =====
      const userId = localStorage.getItem("userId");
      console.log("A verificar localStorage (userId)...", userId);

      if (!userId) {
        console.error(
          "❌ ERRO: userId não encontrado! O utilizador não passou pelo Forms."
        );
        alert("Erro: não foi encontrado um ID válido. Volte à página inicial.");
        return;
      }

      // ===== FORMULÁRIO =====
      let formId = localStorage.getItem("formularioId");
      console.log("A verificar localStorage (formularioId)...", formId);

      if (!formId) {
        console.log("🟠 Não há formulário, a criar...");

        const form = await criarFormulario(userId);
        formId = String(form.idFormulario);

        localStorage.setItem("formularioId", formId);

        console.log("✅ Formulário criado com ID:", formId);
      } else {
        console.log("✅ Formulário existente:", formId);
      }
    };

    iniciar();
  }, []);

  // 🟦 ENVIAR RESPOSTAS
  const enviarRespostas = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const formId = localStorage.getItem("formularioId");

      if (!userId || !formId) {
        alert("Erro: IDs não encontrados. Atualize a página.");
        return;
      }

      const dadosParaEnviar = {
        resposta1: selectedImage,
        resposta2: selectedImage2,
        resposta3: selectedImage3, // 🔵 NOVO
        idUtilizador: Number(userId),
        idFormulario: Number(formId),
      };

      console.log("📤 Enviando para o backend:", dadosParaEnviar);

      await api.post("/respostas", dadosParaEnviar);

      alert("Respostas enviadas com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar respostas:", error);
      alert("Erro ao enviar respostas");
    }
  };

  // Imagens
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

  // 🔵 podes ajustar esta lista como quiseres
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

      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Questionário</h1>

        {/* INSTRUÇÕES */}
        <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg mb-8">
          <p className="text-gray-700">
            <strong>Instruções:</strong> Observe atentamente as imagens
            apresentadas e escolha a que considera mais adequada a cada
            questão.
          </p>
        </div>

        {/* PERGUNTA 1 */}
        <div className="bg-gray-50 border border-gray-300 p-6 rounded-lg shadow-sm mb-8">
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
                className={`border rounded-lg p-2 cursor-pointer transition ${
                  selectedImage === img
                    ? "border-blue-600 shadow-md"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt={`opcao-${index}`} className="w-full rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* PERGUNTA 2 */}
        <div className="bg-gray-50 border border-gray-300 p-6 rounded-lg shadow-sm mb-8">
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
                className={`border rounded-lg p-2 cursor-pointer transition ${
                  selectedImage2 === img
                    ? "border-blue-600 shadow-md"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage2(img)}
              >
                <img src={img} alt={`p2-opcao-${index}`} className="w-full rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* 🔵 PERGUNTA 3 – NOVA */}
        <div className="bg-gray-50 border border-gray-300 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Pergunta 3 – (Perceção habitual do movimento)
          </h2>

          <p className="mb-4">
            Respondendo com honestidade, qual das imagens considera que representa a forma como normalmente movimenta o seu rato no computador?
          </p>

          <div className="grid grid-cols-2 gap-4">
            {imagensPergunta3.map((img, index) => (
              <div
                key={index}
                className={`border rounded-lg p-2 cursor-pointer transition ${
                  selectedImage3 === img
                    ? "border-blue-600 shadow-md"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage3(img)}
              >
                <img src={img} alt={`p3-opcao-${index}`} className="w-full rounded" />
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
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400"
            }`}
          >
            Enviar respostas
          </button>
        </div>
      </div>
    </div>
  );
}
