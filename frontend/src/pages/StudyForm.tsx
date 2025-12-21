import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function StudyForm() {

  const navigate = useNavigate();
  const [faixaEtaria, setFaixaEtaria] = useState("");
  const [genero, setGenero] = useState("");
  const [consentimento, setConsentimento] = useState(false);


  const [codigoParticipante] = useState(() => {
    return (
      "CW-" +
      Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase()
    );
  });

  useEffect(() => {
    window.startBehaviorLogging?.();
  }, []);

  // Submeter formulário
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consentimento) {
      alert("É necessário aceitar o consentimento informado.");
      return;
    }
    const idUtilizador = localStorage.getItem("idUtilizador");

    if (!idUtilizador) {
      alert("Erro: utilizador não encontrado. Recomeça o estudo.");
      return;
    }

    try {
      await api.put(`/utilizadores/${idUtilizador}`, {
        genero,
        idadeFaixa: faixaEtaria,
      });

      localStorage.setItem("codigoParticipante", codigoParticipante);
      localStorage.setItem("consentimento", "true");

      console.log("StudyForm associado ao utilizador:", idUtilizador);
      console.log(" Género:", genero);
      console.log(" Faixa Etária:", faixaEtaria);
      console.log(" Consentimento:", true);
      console.log(" Código do participante:", codigoParticipante);

      navigate("/instrucoes")

    } catch (error) {
      console.error(" Erro ao submeter StudyForm:", error);
      alert("Ocorreu um erro ao guardar os dados. Tenta novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">
          Estudo sobre Mobilidade Digital e Bem-Estar
        </h1>

        <p className="text-sm text-gray-700 mb-6">
          Ao continuares, estás a dar o teu consentimento informado para participar
          de forma anónima neste estudo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Faixa Etária */}
          <div>
            <label className="block font-medium">
              Faixa Etária <span className="text-red-500">*</span>
            </label>
            <select
              value={faixaEtaria}
              onChange={(e) => setFaixaEtaria(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Seleciona</option>
              <option value="Menos de 18 anos">Menos de 18 anos</option>
              <option value="18 a 25 anos">18 a 25 anos</option>
              <option value="26 a 35 anos">26 a 35 anos</option>
              <option value="36 a 50 anos">36 a 50 anos</option>
              <option value="Mais de 50 anos">Mais de 50 anos</option>
            </select>
          </div>

          {/* Género */}
          <div>
            <label className="block font-medium">
              Género <span className="text-red-500">*</span>
            </label>
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Seleciona</option>
              <option value="Feminino">Feminino</option>
              <option value="Masculino">Masculino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          {/* Código do participante */}
          <div>
            <label className="block font-medium">
              Código do Participante
            </label>
            <input
              type="text"
              value={codigoParticipante}
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>

          {/* Consentimento */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={consentimento}
              onChange={(e) => setConsentimento(e.target.checked)}
            />
            <label className="text-sm">
              Declaro que aceito participar neste estudo.
              <span className="text-red-500">*</span>
            </label>
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
