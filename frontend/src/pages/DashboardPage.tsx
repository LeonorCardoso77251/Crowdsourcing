import { useEffect, useMemo, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { obterUtilizadores, obterAvaliacoes, obterRelatorios } from "../api/api";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// =======================
// TIPOS
// =======================
type Utilizador = {
  idUtilizador: number;
  genero: string | null;
  idadeFaixa: string | null;
};

type Avaliacao = {
  idAvaliacao: number;
  scoreTotal: number;
  nivel: string;
  utilizador: {
    idUtilizador: number;
    genero: string | null;
    idadeFaixa: string | null;
  };
};

type Relatorio = {
  idRelatorio: number;
};

// =======================
// FUNÇÕES ESTATÍSTICAS
// =======================
function calcularMediana(valores: number[]) {
  if (valores.length === 0) return 0;
  const sorted = [...valores].sort((a, b) => a - b);
  const meio = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[meio]
    : (sorted[meio - 1] + sorted[meio]) / 2;
}

function calcularDesvioPadrao(valores: number[]) {
  if (valores.length === 0) return 0;
  const media = valores.reduce((acc, v) => acc + v, 0) / valores.length;
  const variancia =
    valores.reduce((acc, v) => acc + (v - media) ** 2, 0) / valores.length;
  return Math.sqrt(variancia);
}

// =======================
// OPTIONS (PIES MAIS PEQUENOS)
// =======================
const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        boxWidth: 12,
        padding: 14,
      },
    },
  },
};

// =======================
// COMPONENTE
// =======================
export default function DashboardPage() {
  const [utilizadores, setUtilizadores] = useState<Utilizador[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);

  const [filtroGenero, setFiltroGenero] = useState("Todos");
  const [filtroFaixa, setFiltroFaixa] = useState("Todos");

  // =======================
  // CARREGAR DADOS
  // =======================
  useEffect(() => {
    const carregar = async () => {
      try {
        const users = await obterUtilizadores();
        const avs = await obterAvaliacoes();
        const rels = await obterRelatorios();

        setUtilizadores(users);
        setAvaliacoes(avs);
        setRelatorios(rels);
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, []);

  // =======================
  // FAIXAS ETÁRIAS
  // =======================
  const faixasDisponiveis = useMemo(() => {
    const set = new Set<string>();
    utilizadores.forEach((u) => {
      if (u.idadeFaixa) set.add(u.idadeFaixa);
    });
    return Array.from(set);
  }, [utilizadores]);

  // =======================
  // UTILIZADORES FILTRADOS
  // =======================
  const utilizadoresFiltrados = useMemo(() => {
    return utilizadores.filter((u) => {
      const genero = u.genero ?? "Não informado";
      const okGenero = filtroGenero === "Todos" || genero === filtroGenero;
      const okFaixa = filtroFaixa === "Todos" || u.idadeFaixa === filtroFaixa;
      return okGenero && okFaixa;
    });
  }, [utilizadores, filtroGenero, filtroFaixa]);

  const idsUtilizadoresFiltrados = useMemo(() => {
    return new Set(utilizadoresFiltrados.map((u) => u.idUtilizador));
  }, [utilizadoresFiltrados]);

  // =======================
  // KPIs
  // =======================
  const totalUtilizadores = utilizadores.length;
  const totalAvaliacoes = avaliacoes.length;
  const totalRelatorios = relatorios.length;

  const scoreMedioGlobal = useMemo(() => {
    if (avaliacoes.length === 0) return "0.00";
    return (
      avaliacoes.reduce((acc, a) => acc + a.scoreTotal, 0) / avaliacoes.length
    ).toFixed(2);
  }, [avaliacoes]);

  // =======================
  // MÉTRICAS EXTRA (SCORE)
  // =======================
  const scoresGlobais = useMemo(
    () => avaliacoes.map((a) => a.scoreTotal),
    [avaliacoes]
  );

  const scoreMediana = useMemo(
    () => calcularMediana(scoresGlobais).toFixed(2),
    [scoresGlobais]
  );

  const scoreDesvioPadrao = useMemo(
    () => calcularDesvioPadrao(scoresGlobais).toFixed(2),
    [scoresGlobais]
  );

  const scoreMin = useMemo(
    () => (scoresGlobais.length ? Math.min(...scoresGlobais).toFixed(2) : "0.00"),
    [scoresGlobais]
  );

  const scoreMax = useMemo(
    () => (scoresGlobais.length ? Math.max(...scoresGlobais).toFixed(2) : "0.00"),
    [scoresGlobais]
  );

  // =======================
  // MÉTRICAS POR GÉNERO
  // =======================
  const statsPorGenero = useMemo(() => {
    const map: Record<string, number[]> = {};
    avaliacoes.forEach((a) => {
      const g = a.utilizador.genero ?? "Não informado";
      if (!map[g]) map[g] = [];
      map[g].push(a.scoreTotal);
    });

    return Object.entries(map)
      .map(([genero, scores]) => ({
        genero,
        n: scores.length,
        media: (scores.reduce((acc, v) => acc + v, 0) / scores.length).toFixed(2),
        mediana: calcularMediana(scores).toFixed(2),
        desvio: calcularDesvioPadrao(scores).toFixed(2),
      }))
      .sort((a, b) => b.n - a.n);
  }, [avaliacoes]);

  // =======================
  // MÉTRICAS POR FAIXA ETÁRIA
  // =======================
  const statsPorFaixa = useMemo(() => {
    const map: Record<string, number[]> = {};

    // usa as avaliações porque são as que têm score
    avaliacoes.forEach((a) => {
      const faixa = a.utilizador.idadeFaixa ?? "Não informado";
      if (!map[faixa]) map[faixa] = [];
      map[faixa].push(a.scoreTotal);
    });

    return Object.entries(map)
      .map(([faixa, scores]) => ({
        faixa,
        n: scores.length,
        media: (scores.reduce((acc, v) => acc + v, 0) / scores.length).toFixed(2),
        mediana: calcularMediana(scores).toFixed(2),
        desvio: calcularDesvioPadrao(scores).toFixed(2),
      }))
      .sort((a, b) => b.n - a.n);
  }, [avaliacoes]);

  // =======================
  // GRÁFICOS (CORES ORIGINAIS)
  // =======================
  const dadosFaixas = useMemo(() => {
    const contagem: Record<string, number> = {};
    utilizadoresFiltrados.forEach((u) => {
      const faixa = u.idadeFaixa ?? "Não informado";
      contagem[faixa] = (contagem[faixa] || 0) + 1;
    });

    return {
      labels: Object.keys(contagem),
      datasets: [
        {
          data: Object.values(contagem),
          backgroundColor: [
            "#4A90E2",
            "#50E3C2",
            "#B8E986",
            "#F8E71C",
            "#D0021B",
            "#BD10E0",
          ],
        },
      ],
    };
  }, [utilizadoresFiltrados]);

  const dadosGeneros = useMemo(() => {
    const cont: Record<string, number> = {
      Feminino: 0,
      Masculino: 0,
      Outro: 0,
      "Não informado": 0,
    };

    utilizadoresFiltrados.forEach((u) => {
      const g = u.genero ?? "Não informado";
      cont[g] = (cont[g] || 0) + 1;
    });

    return {
      labels: Object.keys(cont),
      datasets: [
        {
          data: Object.values(cont),
          backgroundColor: ["#BD10E0", "#7ED321", "#F5A623", "#4A90E2"],
        },
      ],
    };
  }, [utilizadoresFiltrados]);

  const dadosNivel = useMemo(() => {
    const cont: Record<string, number> = {};

    avaliacoes.forEach((a) => {
      const uid = a.utilizador.idUtilizador;
      if (!idsUtilizadoresFiltrados.has(uid)) return;
      cont[a.nivel] = (cont[a.nivel] || 0) + 1;
    });

    return {
      labels: Object.keys(cont),
      datasets: [
        {
          data: Object.values(cont),
          backgroundColor: ["#D0021B", "#F5A623", "#7ED321", "#4A90E2"],
        },
      ],
    };
  }, [avaliacoes, idsUtilizadoresFiltrados]);

  const dadosScore = useMemo(() => {
    const cont = { Baixo: 0, Médio: 0, Alto: 0 };

    avaliacoes.forEach((a) => {
      const uid = a.utilizador.idUtilizador;
      if (!idsUtilizadoresFiltrados.has(uid)) return;

      if (a.scoreTotal <= 2) cont.Baixo++;
      else if (a.scoreTotal <= 4) cont.Médio++;
      else cont.Alto++;
    });

    return {
      labels: Object.keys(cont),
      datasets: [
        {
          data: Object.values(cont),
          backgroundColor: ["#D0021B", "#F8E71C", "#7ED321"],
        },
      ],
    };
  }, [avaliacoes, idsUtilizadoresFiltrados]);

  // =======================
  // RENDER
  // =======================
  return (
    <>
      <AdminNavbar />

      {/* Fundo subtil e espaçamento melhor */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-indigo-50">

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <div className="flex gap-4 mb-10">
  <div className="w-1 bg-indigo-500 rounded-full" />
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 w-full">
              <h1 className="text-3xl font-bold">
                Dashboard — Estatísticas do Sistema
              </h1>
              <p className="text-gray-600 mt-2 max-w-3xl">
                Visão agregada e anonimizadas das variáveis demográficas e dos
                resultados de avaliação. Inclui métricas descritivas (média,
                mediana e desvio padrão) para apoiar análise exploratória.
              </p>
            </div>


          </div>

          {/* KPIs principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPI titulo="Utilizadores" valor={totalUtilizadores} />
            <KPI titulo="Avaliações" valor={totalAvaliacoes} />
            <KPI titulo="Relatórios" valor={totalRelatorios} />
            <KPI titulo="Score Médio" valor={scoreMedioGlobal} />
          </div>

          {/* Métricas extra do score (mais “académico”) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
            <KPI titulo="Mediana" valor={scoreMediana} />
            <KPI titulo="Desvio Padrão" valor={scoreDesvioPadrao} />
            <KPI titulo="Mínimo" valor={scoreMin} />
            <KPI titulo="Máximo" valor={scoreMax} />
            <KPI titulo="Amostra (N)" valor={scoresGlobais.length} />
          </div>

          {/* Filtros */}
          <div className="bg-white p-5 md:p-6 shadow rounded-lg mb-10">
            <h2 className="font-semibold mb-4">Filtros</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold block mb-2">Género</label>
                <select
                  value={filtroGenero}
                  onChange={(e) => setFiltroGenero(e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option>Todos</option>
                  <option>Feminino</option>
                  <option>Masculino</option>
                  <option>Outro</option>
                  <option>Não informado</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-2">Faixa Etária</label>
                <select
                  value={filtroFaixa}
                  onChange={(e) => setFiltroFaixa(e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option>Todos</option>
                  {faixasDisponiveis.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Nota: os filtros afetam os gráficos e a tabela de utilizadores.
            </p>
          </div>

          {loading ? (
            <p>A carregar dados…</p>
          ) : (
            <>
              {/* GRÁFICOS (Pies menores e consistentes) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <CardGrafico titulo="Faixa Etária">
                  <div className="h-64 flex justify-center">
                    <Pie data={dadosFaixas} options={pieOptions} />
                  </div>
                </CardGrafico>

                <CardGrafico titulo="Género">
                  <div className="h-64 flex justify-center">
                    <Pie data={dadosGeneros} options={pieOptions} />
                  </div>
                </CardGrafico>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <CardGrafico titulo="Nível">
                  <div className="h-64 flex justify-center">
                    <Pie data={dadosNivel} options={pieOptions} />
                  </div>
                </CardGrafico>

                <CardGrafico titulo="Score">
                  <div className="h-64 flex justify-center">
                    <Pie data={dadosScore} options={pieOptions} />
                  </div>
                </CardGrafico>
              </div>

              {/* TABELAS analíticas (por género e por faixa) */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100
">
                  <h2 className="font-semibold mb-4">Estatísticas do Score por Género</h2>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-xl overflow-hidden">

<thead className="bg-gray-100">
  <tr>
    <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-left">Género</th>
    <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">N</th>
    <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">Média</th>
    <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">Mediana</th>
    <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">DP</th>
  </tr>
</thead>
<tbody className="divide-y divide-gray-100">
  {statsPorGenero.map((g, i) => (
    <tr
      key={g.genero}
      className={`${
        i % 2 === 0 ? "bg-white" : "bg-gray-50"
      } hover:bg-indigo-50 transition`}
    >
      <td className="px-4 py-3 text-sm text-gray-800">{g.genero}</td>
      <td className="px-4 py-3 text-sm text-center font-medium">{g.n}</td>
      <td className="px-4 py-3 text-sm text-center">{g.media}</td>
      <td className="px-4 py-3 text-sm text-center">{g.mediana}</td>
      <td className="px-4 py-3 text-sm text-center">{g.desvio}</td>
    </tr>
  ))}
</tbody>

                    </table>
                  </div>

                  <p className="text-xs text-gray-500 mt-3">
                    DP = desvio padrão. Valores calculados a partir das avaliações disponíveis.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100
">
                  <h2 className="font-semibold mb-4">
                    Estatísticas do Score por Faixa Etária
                  </h2>

                  <div className="overflow-x-auto">
                  <table className="w-full border-collapse rounded-xl overflow-hidden">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-left">
        Faixa Etária
      </th>
      <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">
        N
      </th>
      <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">
        Média
      </th>
      <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">
        Mediana
      </th>
      <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">
        DP
      </th>
    </tr>
  </thead>

  <tbody className="divide-y divide-gray-100">
    {statsPorFaixa.map((f, i) => (
      <tr
        key={f.faixa}
        className={`${
          i % 2 === 0 ? "bg-white" : "bg-gray-50"
        } hover:bg-indigo-50 transition`}
      >
        <td className="px-4 py-3 text-sm text-gray-800">
          {f.faixa}
        </td>
        <td className="px-4 py-3 text-sm text-center font-medium">
          {f.n}
        </td>
        <td className="px-4 py-3 text-sm text-center">
          {f.media}
        </td>
        <td className="px-4 py-3 text-sm text-center">
          {f.mediana}
        </td>
        <td className="px-4 py-3 text-sm text-center">
          {f.desvio}
        </td>
      </tr>
    ))}
  </tbody>
</table>

                  </div>

                  <p className="text-xs text-gray-500 mt-4 leading-relaxed">
  As faixas etárias são categorias; as métricas apresentadas referem-se ao score.
</p>

                </div>
              </div>

              {/* TABELA FINAL (MANTIDA) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                  <h2 className="font-semibold">Utilizadores (Filtrados)</h2>
                  <p className="text-sm text-gray-600">
                    A mostrar <b>{utilizadoresFiltrados.length}</b> utilizadores.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse rounded-xl overflow-hidden">

<thead className="bg-gray-100">
  <tr>
    <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">ID</th>
    <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-left">Faixa Etária</th>
    <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-left">Género</th>
  </tr>
</thead>

                   <tbody className="divide-y divide-gray-100">
  {utilizadoresFiltrados.map((u, i) => (
    <tr
      key={u.idUtilizador}
      className={`${
        i % 2 === 0 ? "bg-white" : "bg-gray-50"
      } hover:bg-indigo-50 transition`}
    >
      <td className="px-4 py-3 text-sm text-center font-mono">
        {u.idUtilizador}
      </td>
      <td className="px-4 py-3 text-sm">
        {u.idadeFaixa ?? "—"}
      </td>
      <td className="px-4 py-3 text-sm">
        {u.genero ?? "Não informado"}
      </td>
    </tr>
  ))}
</tbody>

                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// =======================
// COMPONENTES UI
// =======================
function KPI({ titulo, valor }: { titulo: string; valor: number | string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
      <p className="text-gray-500">{titulo}</p>
      <p className="text-3xl font-bold">{valor}</p>
    </div>
  );
}

function CardGrafico({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">{titulo}</h2>
        <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
          Distribuição
        </span>
      </div>
      {children}
    </div>
  );
}

