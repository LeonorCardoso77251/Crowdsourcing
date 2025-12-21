import { useEffect, useMemo, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { obterRelatorios } from "../api/api";

import { Bar, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
);
type MouseMovement = {
  x: number;
  y: number;
  timestamp: number;
};

type BehavioralLogs = {
  time?: {
    totalTime?: number;
  };
  clicks?: {
    clickCount?: number;
  };
  mouseMovements?: MouseMovement[];
};

type Relatorio = {
  idRelatorio: number;
  behavioralLogs: Record<string, unknown> | string | null;
  utilizador: {
    idUtilizador: number;
  };
};

// FUNÇÕES AUXILIARES
function calcularVelocidadeMedia(
  movimentos: { x: number; y: number; timestamp: number }[]
): number {
  if (!movimentos || movimentos.length < 2) return 0;

  let distanciaTotal = 0;
  const tempoTotal =
    movimentos[movimentos.length - 1].timestamp -
    movimentos[0].timestamp;

  for (let i = 1; i < movimentos.length; i++) {
    const dx = movimentos[i].x - movimentos[i - 1].x;
    const dy = movimentos[i].y - movimentos[i - 1].y;
    distanciaTotal += Math.sqrt(dx * dx + dy * dy);
  }

  if (tempoTotal <= 0) return 0;

  return distanciaTotal / tempoTotal; 
}

function classificarEnvolvimento(
  tempo: number,
  cliques: number,
  movimentos: number
): "Baixo" | "Médio" | "Alto" {
  const score =
    (tempo > 5 ? 1 : 0) +
    (cliques > 3 ? 1 : 0) +
    (movimentos > 500 ? 1 : 0);

  if (score <= 1) return "Baixo";
  if (score === 2) return "Médio";
  return "Alto";
}

// COMPONENTE
export default function BehavioralDashboardPage() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);

  //  CARREGAR RELATÓRIOS
  
  useEffect(() => {
    const carregar = async () => {
      try {
        const rels = await obterRelatorios();
        setRelatorios(rels);
      } catch (e) {
        console.error("Erro ao carregar relatórios:", e);
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, []);

  //  RELATÓRIOS COM LOGS

  const relatoriosValidos = useMemo(() => {
  return relatorios
    .map((r) => {
      if (!r.behavioralLogs) return null;

      try {
        const parsed: BehavioralLogs =
          typeof r.behavioralLogs === "string"
            ? JSON.parse(r.behavioralLogs)
            : (r.behavioralLogs as BehavioralLogs);

        return {
          idRelatorio: r.idRelatorio,
          utilizador: r.utilizador,
          logs: parsed,
        };
      } catch {
        return null;
      }
    })
    .filter(
      (r): r is {
        idRelatorio: number;
        utilizador: { idUtilizador: number };
        logs: BehavioralLogs;
      } => r !== null
    );
}, [relatorios]);

  //EXTRAÇÃO DE MÉTRICAS

  const metricas = useMemo(() => {
    return relatoriosValidos.map((r) => {
      const tempo = r.logs.time?.totalTime ?? 0;
      const cliques = r.logs.clicks?.clickCount ?? 0;
      const movimentosArr: MouseMovement[] =
  r.logs.mouseMovements ?? [];

      const movimentos = movimentosArr.length;

      const velocidade = calcularVelocidadeMedia(movimentosArr);
      const envolvimento = classificarEnvolvimento(
        tempo,
        cliques,
        movimentos
      );

      return {
        utilizador: r.utilizador.idUtilizador,
        tempo,
        cliques,
        movimentos,
        velocidade,
        envolvimento,
      };
    });
  }, [relatoriosValidos]);

  //  KPIs

  const kpis = useMemo(() => {
    const total = metricas.length;

    if (total === 0) {
      return {
        tempoMedio: "0.00",
        cliquesMedios: "0.00",
        movimentosMedios: "0.00",
        velocidadeMedia: "0.0000",
      };
    }

    const somaTempo = metricas.reduce((a, m) => a + m.tempo, 0);
    const somaCliques = metricas.reduce((a, m) => a + m.cliques, 0);
    const somaMov = metricas.reduce((a, m) => a + m.movimentos, 0);
    const somaVel = metricas.reduce((a, m) => a + m.velocidade, 0);

    return {
      tempoMedio: (somaTempo / total).toFixed(2),
      cliquesMedios: (somaCliques / total).toFixed(2),
      movimentosMedios: (somaMov / total).toFixed(2),
      velocidadeMedia: (somaVel / total).toFixed(4),
    };
  }, [metricas]);


  //GRÁFICOS

  const dadosTempo = {
    labels: metricas.map((m) => `U${m.utilizador}`),
    datasets: [
      {
        label: "Tempo (s)",
        data: metricas.map((m) => m.tempo),
        backgroundColor: "#4A90E2",
      },
    ],
  };

  const dadosCliques = {
    labels: metricas.map((m) => `U${m.utilizador}`),
    datasets: [
      {
        label: "Cliques",
        data: metricas.map((m) => m.cliques),
        backgroundColor: "#7ED321",
      },
    ],
  };

  const dadosScatter = {
    datasets: [
      {
        label: "Tempo vs Cliques",
        data: metricas.map((m) => ({
          x: m.tempo,
          y: m.cliques,
        })),
        backgroundColor: "#D0021B",
      },
    ],
  };

  const dadosEnvolvimento = useMemo(() => {
    const cont = { Baixo: 0, Médio: 0, Alto: 0 };

    metricas.forEach((m) => cont[m.envolvimento]++);

    return {
      labels: Object.keys(cont),
      datasets: [
        {
          label: "Envolvimento",
          data: Object.values(cont),
          backgroundColor: ["#D0021B", "#F5A623", "#7ED321"],
        },
      ],
    };
  }, [metricas]);


  //RENDER

  return (
    <>
      <AdminNavbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-2">
          Dashboard — Análise Comportamental
        </h1>

        <p className="text-gray-600 mb-10 lg:mb-14">

        </p>

        {loading ? (
          <p>A carregar dados…</p>
        ) : (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <KPI titulo="Tempo Médio (s)" valor={kpis.tempoMedio} />
              <KPI titulo="Cliques Médios" valor={kpis.cliquesMedios} />
              <KPI titulo="Movimentos Médios" valor={kpis.movimentosMedios} />
              <KPI
                titulo="Velocidade Média (px/ms)"
                valor={kpis.velocidadeMedia}
              />
            </div>

            {/* GRÁFICOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">
                  Tempo por Utilizador
                </h2>
                <Bar data={dadosTempo} />
              </div>

              <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">
                  Cliques por Utilizador
                </h2>
                <Bar data={dadosCliques} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">
                  Relação Tempo vs Cliques
                </h2>
                <Scatter data={dadosScatter} />
              </div>

              <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">
                  Nível de Envolvimento
                </h2>
                <Bar data={dadosEnvolvimento} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

// KPI COMPONENT

function KPI({ titulo, valor }: { titulo: string; valor: number | string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
      <p className="text-xs uppercase tracking-wider text-gray-500">
        {titulo}
      </p>
      <p className="mt-3 text-3xl font-bold text-gray-900">
        {valor}
      </p>
    </div>
  );
}

