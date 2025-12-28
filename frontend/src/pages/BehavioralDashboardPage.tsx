import { useEffect, useMemo, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { obterRelatorios } from "../api/api";

import { Scatter, Chart } from "react-chartjs-2";

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement
);


// =======================
// TIPOS
// =======================

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

// =======================
// FUNÇÕES ESTATÍSTICAS
// =======================

function mediana(valores: number[]): number {
  if (valores.length === 0) return 0;
  const sorted = [...valores].sort((a, b) => a - b);
  const meio = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[meio]
    : (sorted[meio - 1] + sorted[meio]) / 2;
}
function quartil(valores: number[], q: number): number {
  if (valores.length === 0) return 0;

  const sorted = [...valores].sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;

  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }

  
  return sorted[base];
}

function desvioPadrao(valores: number[]): number {
  if (valores.length === 0) return 0;
  const media = valores.reduce((a, b) => a + b, 0) / valores.length;
  const variancia =
    valores.reduce((a, b) => a + (b - media) ** 2, 0) /
    valores.length;
  return Math.sqrt(variancia);
}

function correlacaoPearson(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length === 0) return 0;

  const mediaX = x.reduce((a, b) => a + b, 0) / x.length;
  const mediaY = y.reduce((a, b) => a + b, 0) / y.length;

  let num = 0;
  let denX = 0;
  let denY = 0;

  for (let i = 0; i < x.length; i++) {
    num += (x[i] - mediaX) * (y[i] - mediaY);
    denX += (x[i] - mediaX) ** 2;
    denY += (y[i] - mediaY) ** 2;
  }

  return num / Math.sqrt(denX * denY);
}

// =======================
// FUNÇÕES COMPORTAMENTAIS
// =======================

function calcularVelocidadeMedia(movimentos: MouseMovement[]): number {
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
    (tempo > 60 ? 1 : 0) +
    (cliques > 5 ? 1 : 0) +
    (movimentos > 500 ? 1 : 0);

  if (score <= 1) return "Baixo";
  if (score === 2) return "Médio";
  return "Alto";
}

function interpretarCorrelacao(r: number): string {
  const abs = Math.abs(r);
  if (abs < 0.3) return "Correlação fraca entre tempo e cliques.";
  if (abs < 0.6) return "Correlação moderada entre tempo e cliques.";
  return "Correlação forte entre tempo e cliques.";
}

function analisarTempo(tempo: number): string {
  if (tempo < 60)
    return "Interação muito rápida — possível leitura superficial.";
  if (tempo < 180)
    return "Tempo compatível com preenchimento normal.";
  return "Interação prolongada — possível maior envolvimento cognitivo.";
}

// =======================
// COMPONENTE
// =======================

export default function BehavioralDashboardPage() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const rels = await obterRelatorios();
        setRelatorios(rels);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

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
            utilizador: r.utilizador.idUtilizador,
            logs: parsed,
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean) as {
      utilizador: number;
      logs: BehavioralLogs;
    }[];
  }, [relatorios]);

  const metricas = useMemo(() => {
    return relatoriosValidos.map((r) => {
      const tempo = r.logs.time?.totalTime ?? 0;
      const cliques = r.logs.clicks?.clickCount ?? 0;
      const movimentosArr = r.logs.mouseMovements ?? [];

      return {
        utilizador: r.utilizador,
        tempo,
        cliques,
        movimentos: movimentosArr.length,
        velocidade: calcularVelocidadeMedia(movimentosArr),
        envolvimento: classificarEnvolvimento(
          tempo,
          cliques,
          movimentosArr.length
        ),
        analiseTempo: analisarTempo(tempo),
      };
    });
  }, [relatoriosValidos]);

  // =======================
  // ESTATÍSTICAS
  // =======================

  const tempos = metricas.map((m) => m.tempo);
  const cliques = metricas.map((m) => m.cliques);
  const q1 = quartil(tempos, 0.25);
const q3 = quartil(tempos, 0.75);
const med = quartil(tempos, 0.5);
const min = Math.min(...tempos);
const max = Math.max(...tempos);
const media =
  tempos.reduce((a, b) => a + b, 0) / (tempos.length || 1);

  const stats = {
    tempoMediana: mediana(tempos).toFixed(2),
    tempoDP: desvioPadrao(tempos).toFixed(2),
    cliquesMediana: mediana(cliques).toFixed(2),
    cliquesDP: desvioPadrao(cliques).toFixed(2),
  };

  const rPearson = correlacaoPearson(tempos, cliques);
  const interpretacaoPearson = interpretarCorrelacao(rPearson);

  // =======================
  // GRÁFICOS
  // =======================
// =======================
// BOXPLOT MANUAL — DADOS
// =======================

const dadosBoxplotManual: unknown = {

  labels: ["Tempo de Interação (s)"],
  datasets: [
    // 🟦 CAIXA (Q1 → Q3)
    {
      type: "bar" as const,
      label: "Intervalo Interquartil",
      data: [q3 - q1],
      backgroundColor: "rgba(74,144,226,0.4)",
      borderColor: "#4A90E2",
      borderWidth: 2,
      base: q1,
    },

    // ➖ MEDIANA
    {
      type: "line" as const,
      label: "Mediana",
      data: [med],
      borderColor: "#000",
      borderWidth: 3,
      pointRadius: 0,
    },

    // 🔴 MÉDIA
    {
      type: "scatter" as const,
      label: "Média",
      data: [{ x: 0, y: media }],
      backgroundColor: "red",
      pointRadius: 6,
    },

    // ⬇️ WHISKER INFERIOR
    {
      type: "line" as const,
      label: "Mínimo",
      data: [min],
      borderColor: "#555",
      borderWidth: 2,
      pointRadius: 0,
    },

    // ⬆️ WHISKER SUPERIOR
    {
      type: "line" as const,
      label: "Máximo",
      data: [max],
      borderColor: "#555",
      borderWidth: 2,
      pointRadius: 0,
    },
  ],
};
const opcoesBoxplotManual = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      title: {
        display: true,
        text: "Segundos",
      },
    },
  },
};

  const dadosScatter = {
    datasets: [
      {
        label: "Tempo vs Cliques",
        data: metricas.map((m) => ({ x: m.tempo, y: m.cliques })),
        backgroundColor: "#4A90E2",
      },
    ],
  };

  // =======================
  // RENDER
  // =======================

  return (
    <>
      <AdminNavbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">
          Dashboard — Análise Comportamental Avançada
        </h1>

        {loading ? (
          <p>A carregar dados…</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <KPI titulo="Mediana Tempo (s)" valor={stats.tempoMediana} />
              <KPI titulo="DP Tempo" valor={stats.tempoDP} />
              <KPI titulo="Mediana Cliques" valor={stats.cliquesMediana} />
              <KPI titulo="DP Cliques" valor={stats.cliquesDP} />
            </div>

            <div className="bg-white p-6 rounded shadow mb-10">
              <h2 className="font-semibold mb-2">
                Correlação de Pearson
              </h2>
              <div className="bg-white p-6 rounded shadow mb-10">
  <h2 className="font-semibold mb-4">
    Distribuição do Tempo de Interação
  </h2>

<Chart
  type="bar"
  data={
    dadosBoxplotManual as unknown as import("chart.js").ChartData<"bar">
  }
  options={opcoesBoxplotManual}
/>
</div>

              <p>
                r = <strong>{rPearson.toFixed(3)}</strong>
              </p>
              <p className="text-gray-600 mt-2">
                {interpretacaoPearson}
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="font-semibold mb-4">
                Relação Tempo vs Cliques
              </h2>
              <Scatter data={dadosScatter} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

// =======================
// KPI COMPONENT
// =======================

function KPI({ titulo, valor }: { titulo: string; valor: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <p className="text-xs text-gray-500 uppercase">{titulo}</p>
      <p className="mt-3 text-2xl font-bold">{valor}</p>
    </div>
  );
}
