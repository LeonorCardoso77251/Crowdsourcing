import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { api } from "../api/api";
import { useBehavioralTracking } from "../hooks/useBehavioralTracking";
import { useLocation, Navigate } from "react-router-dom";
import { calcularAvaliacao } from "../utils/avaliacao";

export default function AvaliacaoPage() {
 
  useBehavioralTracking();

  // respostas vindas do formulário
  const location = useLocation();
  const respostas = location.state?.respostas;

  // Calcula resultado só se houver respostas
  const resultado = respostas ? calcularAvaliacao(respostas) : null;

  // Guardar avaliação
  useEffect(() => {
    if (!resultado) return;

    const idUtilizador = localStorage.getItem("idUtilizador");
    const idFormulario = localStorage.getItem("formularioId");

    if (!idUtilizador || !idFormulario) {
      console.error("idUtilizador ou idFormulario em falta");
      return;
    }

    api.post("/avaliacoes", {
      idUtilizador: Number(idUtilizador),
      idFormulario: Number(idFormulario),
      scoreTotal: resultado.scoreTotal,
      nivel: resultado.nivel,
    })
    .then(() => {
      console.log("Avaliação guardada com sucesso");
    })
    .catch((err) => {
      console.error("Erro ao guardar avaliação:", err);
    });

  }, [resultado]);

  //  Guardar logs comportamentais
  useEffect(() => {
    const logs = localStorage.getItem("behaviorLogs");
    const idUtilizador = localStorage.getItem("idUtilizador");

    if (!idUtilizador || !logs) return;

    api.post("/relatorios/behavioral", {
      userId: Number(idUtilizador),
      logs: JSON.parse(logs),
    })
    .then(() => {
      console.log("Relatório criado / atualizado com sucesso");

      localStorage.removeItem("behaviorLogs");
      localStorage.removeItem("studyActive");
      localStorage.removeItem("formularioId");
    })
    .catch((err) => {
      if (err.response?.status === 500) {
        console.warn(" Relatório já existente — ignorado");
      } else {
        console.error("Erro ao enviar logs:", err);
      }
    });
  }, []);

  // Proteção de rota
  if (!respostas) {
    return <Navigate to="/formulario" replace />;
  }

  return (
    <div>
      <Navbar />

      <div className="p-8 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-6">
          Obrigado pela sua participação
        </h1>

        <p className="text-lg mb-6">
            A sua colaboração foi fundamental para o desenvolvimento deste estudo académico.
            De seguida, apresentamos um resultado informativo, baseado exclusivamente nas imagens selecionadas durante a interação.
        </p>

        <div className="bg-red-50 border border-red-300 p-6 rounded-lg text-left">
          <h2 className="text-xl font-semibold mb-4">
            Resultado da avaliação
          </h2>

          <p className="mb-2">
            <strong>{resultado?.nivel}</strong>
          </p>

          <p className="mb-4">
            {resultado?.descricao}
          </p>

          <p className="text-sm text-gray-600">
            Nota: Este resultado baseia-se exclusivamente nas imagens selecionadas
            durante o questionário e não constitui um diagnóstico clínico.
          </p>
        </div>
      </div>
    </div>
  );
}
