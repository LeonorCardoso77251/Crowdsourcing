// src/pages/FormularioFill.tsx
import { useState } from "react";
import { createFormulario } from "../services/formularioService";
import { CheckCircle2, Info } from "lucide-react";
import type { Formulario } from "../types/formulario";

interface FormularioFillProps {
  usuarioId: number;
}

interface ImageOption {
  id: number;
  url: string;
  label: string;
}

export default function FormularioFill({ usuarioId }: FormularioFillProps) {
  const [selectedQuestion1, setSelectedQuestion1] = useState<number | null>(null);
  const [selectedQuestion2, setSelectedQuestion2] = useState<number | null>(null);
  const [enviado, setEnviado] = useState(false);

  // Imagens exemplo
  const question1Images: ImageOption[] = [
    { id: 1, url: 'https://images.unsplash.com/photo-1595420832643-faf4aaf65c5b?w=400', label: 'Opção 1' },
    { id: 2, url: 'https://images.unsplash.com/photo-1758598497219-45e77afc5b53?w=400', label: 'Opção 2' },
    { id: 3, url: 'https://images.unsplash.com/photo-1624395213232-ea2bcd36b865?w=400', label: 'Opção 3' },
    { id: 4, url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400', label: 'Opção 4' },
    { id: 5, url: 'https://images.unsplash.com/photo-1641232458416-feace752b346?w=400', label: 'Opção 5' },
    { id: 6, url: 'https://images.unsplash.com/photo-1735516908500-e55bec421585?w=400', label: 'Opção 6' },
  ];

  const question2Images: ImageOption[] = [
    { id: 1, url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400', label: 'Opção A' },
    { id: 2, url: 'https://images.unsplash.com/photo-1641232458416-feace752b346?w=400', label: 'Opção B' },
    { id: 3, url: 'https://images.unsplash.com/photo-1595420832643-faf4aaf65c5b?w=400', label: 'Opção C' },
    { id: 4, url: 'https://images.unsplash.com/photo-1758598497219-45e77afc5b53?w=400', label: 'Opção D' },
    { id: 5, url: 'https://images.unsplash.com/photo-1624395213232-ea2bcd36b865?w=400', label: 'Opção E' },
    { id: 6, url: 'https://images.unsplash.com/photo-1706554596975-dd09285c0046?w=400', label: 'Opção F' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedQuestion1 === null || selectedQuestion2 === null) {
      alert("Por favor, selecione uma imagem para cada pergunta.");
      return;
    }

    const formularioData: Partial<Formulario> = {
      pergunta1: question1Images.find(img => img.id === selectedQuestion1)?.url ?? "",
      pergunta2: question2Images.find(img => img.id === selectedQuestion2)?.url ?? "",
      utilizador: { idUtilizador: usuarioId },
    };

    try {
      await createFormulario(formularioData);
      setEnviado(true);
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao enviar o formulário.");
    }
  };

  if (enviado) {
    return (
      <div className="flex items-center justify-center p-6 min-h-screen bg-green-50">
        <div className="max-w-xl w-full text-center p-8 bg-white rounded-xl shadow-lg space-y-6">
          <CheckCircle2 className="w-16 h-16 mx-auto text-green-600" />
          <h1 className="text-2xl font-bold text-green-800">Obrigado!</h1>
          <p className="text-gray-700">O seu formulário foi enviado com sucesso.</p>
        </div>
      </div>
    );
  }

  return (
<form onSubmit={handleSubmit} className="flex flex-col items-center justify-start min-h-screen p-6 space-y-10">
  {/* Título */}
  <h1 className="text-3xl font-bold text-center mb-6">Preencha o Formulário</h1>

  {/* Caixa de instruções */}
  <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-blue-600 w-full max-w-3xl">
    <div className="flex items-center gap-2 text-blue-600 mb-2">
      <Info className="w-5 h-5" />
      <span className="font-semibold">Instruções:</span>
    </div>
    <p className="text-gray-700">
      Observe atentamente as imagens apresentadas e escolha a que considera mais adequada a cada questão.
      O seu rato será monitorizado apenas para fins de análise de movimento (sem recolha de dados pessoais).
    </p>
  </div>

  {/* Pergunta 1 */}
  <div className="w-full max-w-3xl text-center">
    <p className="font-bold mb-1">Pergunta 1 – Identificação da imagem com maior mobilidade</p>
    <p className="text-gray-600 mb-4">
      Qual destas imagens considera que representa maior mobilidade?
    </p>
    <div className="grid grid-cols-3 grid-rows-2 gap-4 justify-items-center">
      {question1Images.map(img => (
        <button
          key={img.id}
          type="button"
          onClick={() => setSelectedQuestion1(img.id)}
          className={`relative overflow-hidden rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg border-4 ${
            selectedQuestion1 === img.id ? "border-blue-600" : "border-transparent"
          }`}
        >
          <img src={img.url} alt={img.label} className="w-32 h-32 object-cover" />
          {selectedQuestion1 === img.id && (
            <CheckCircle2 className="absolute top-2 right-2 w-6 h-6 text-blue-600" />
          )}
        </button>
      ))}
    </div>
  </div>

  {/* Pergunta 2 */}
  <div className="w-full max-w-3xl text-center">
    <p className="font-bold mb-1">Pergunta 2 – Autoavaliação de movimento</p>
    <p className="text-gray-600 mb-4">
      Tendo em conta a forma como movimentou o seu rato durante a pergunta anterior, qual das imagens considera que melhor representa esse movimento?
    </p>
    <div className="grid grid-cols-3 grid-rows-2 gap-4 justify-items-center">
      {question2Images.map(img => (
        <button
          key={img.id}
          type="button"
          onClick={() => setSelectedQuestion2(img.id)}
          className={`relative overflow-hidden rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg border-4 ${
            selectedQuestion2 === img.id ? "border-blue-600" : "border-transparent"
          }`}
        >
          <img src={img.url} alt={img.label} className="w-32 h-32 object-cover" />
          {selectedQuestion2 === img.id && (
            <CheckCircle2 className="absolute top-2 right-2 w-6 h-6 text-blue-600" />
          )}
        </button>
      ))}
    </div>
  </div>

  {/* Botão Enviar */}
  <div className="text-center mt-6">
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
    >
      Enviar Formulário
    </button>
  </div>
</form>

  );
}
