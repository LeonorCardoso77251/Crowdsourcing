import { useEffect, useMemo, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { obterUtilizadores, obterAvaliacoes, obterRelatorios } from "../api/api";

import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

// =======================
// TIPOS (ALINHADOS COM O BACKEND)
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
  totalMensagens: number | null;
  behavioralLogs: Record<string, unknown> | null;
  dataCriacao: string;
  utilizador: {
    idUtilizador: number;
    genero: string | null;
    idadeFaixa: string | null;
  };
};

// =======================
// COMPONENTE
// =======================
export default function DashboardPage() {
  const [utilizadores, setUtilizadores] = useState<Utilizador[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔵 Filtros (os teus + 1 novo)
  const [filtroGenero, setFiltroGenero] = useState("Todos");
  const [filtroFaixa, setFiltroFaixa] = useState("Todos");
  const [apenasComRelatorio, setApenasComRelatorio] = useState(false);

  // =======================
  // 🔵 CARREGAR DADOS
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
  // 🔵 FAIXAS ETÁRIAS DINÂMICAS
  // =======================
  const faixasDisponiveis = useMemo(() => {
    const set = new Set<string>();
    utilizadores.forEach((u) => {
      if (u.idadeFaixa) set.add(u.idadeFaixa);
    });
    return Array.from(set);
  }, [utilizadores]);

  // =======================
  // 🔵 UTILIZADORES FILTRADOS (EXTENDIDO, NÃO ALTERADO)
  // =======================
  const utilizadoresFiltrados = useMemo(() => {
    const idsComRelatorio = new Set(
      relatorios.map((r) => r.utilizador.idUtilizador)
    );

    return utilizadores.filter((u) => {
      const genero = u.genero ?? "Não informado";
      const okGenero = filtroGenero === "Todos" || genero === filtroGenero;
      const okFaixa = filtroFaixa === "Todos" || u.idadeFaixa === filtroFaixa;
      const okRelatorio =
        !apenasComRelatorio || idsComRelatorio.has(u.idUtilizador);

      return okGenero && okFaixa && okRelatorio;
    });
  }, [
    utilizadores,
    filtroGenero,
    filtroFaixa,
    apenasComRelatorio,
    relatorios,
  ]);

  const idsUtilizadoresFiltrados = useMemo(() => {
    return new Set(utilizadoresFiltrados.map((u) => u.idUtilizador));
  }, [utilizadoresFiltrados]);

  // =======================
  // 🔵 KPIs
  // =======================
  const totalUtilizadores = utilizadores.length;
  const totalAvaliacoes = avaliacoes.length;
  const totalRelatorios = relatorios.length;

  const percentagemScoreAlto = useMemo(() => {
    if (avaliacoes.length === 0) return 0;
    const altos = avaliacoes.filter((a) => a.scoreTotal > 4).length;
    return Math.round((altos / avaliacoes.length) * 100);
  }, [avaliacoes]);

  // =======================
  // 🔵 MÉTRICAS COMPORTAMENTAIS
  // =======================
  const relatoriosComLogs = useMemo(() => {
    return relatorios.filter(
      (r) => r.behavioralLogs && Object.keys(r.behavioralLogs).length > 0
    ).length;
  }, [relatorios]);

  const scoreMedioComRelatorio = useMemo(() => {
    const ids = new Set(relatorios.map((r) => r.utilizador.idUtilizador));
    const scores = avaliacoes
      .filter((a) => ids.has(a.utilizador.idUtilizador))
      .map((a) => a.scoreTotal);

    if (scores.length === 0) return "0.00";
    return (
      scores.reduce((acc, v) => acc + v, 0) / scores.length
    ).toFixed(2);
  }, [avaliacoes, relatorios]);

  // =======================
  // 🔵 RELATÓRIOS POR MÊS
  // =======================
  const dadosRelatoriosPorMes = useMemo(() => {
    const cont: Record<string, number> = {};

    relatorios.forEach((r) => {
      const mes = r.dataCriacao.slice(0, 7); // YYYY-MM
      cont[mes] = (cont[mes] || 0) + 1;
    });

    return {
      labels: Object.keys(cont),
      datasets: [
        {
          label: "Relatórios",
          data: Object.values(cont),
          backgroundColor: "#4A90E2",
        },
      ],
    };
  }, [relatorios]);

  // =======================
  // 🔵 GRÁFICOS ORIGINAIS (INTOCADOS)
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

  const dadosRelatorios = useMemo(() => {
    const comRelatorio = relatorios.filter((r) =>
      idsUtilizadoresFiltrados.has(r.utilizador.idUtilizador)
    ).length;

    const total = utilizadoresFiltrados.length;
    const semRelatorio = Math.max(total - comRelatorio, 0);

    return {
      labels: ["Com Relatório", "Sem Relatório"],
      datasets: [
        {
          data: [comRelatorio, semRelatorio],
          backgroundColor: ["#4A90E2", "#B8E986"],
        },
      ],
    };
  }, [relatorios, idsUtilizadoresFiltrados, utilizadoresFiltrados.length]);

  // =======================
  // 🔵 RENDER
  // =======================
  return (
    <>
      <AdminNavbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-2">
          Dashboard — Estatísticas do Sistema
        </h1>

        <p className="text-gray-600 mb-6">
          Estatísticas agregadas e anonimizadas recolhidas no âmbito do estudo
          experimental de análise comportamental e avaliação de bem-estar.
        </p>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <KPI titulo="Utilizadores" valor={totalUtilizadores} />
          <KPI titulo="Avaliações" valor={totalAvaliacoes} />
          <KPI titulo="Relatórios" valor={totalRelatorios} />
          <KPI titulo="% Score Alto" valor={`${percentagemScoreAlto}%`} />
        </div>

        {/* FILTROS (OS TEUS + 1 NOVO) */}
        <div className="flex flex-wrap gap-6 mb-10">
          <div>
            <label className="font-semibold block mb-2">Género</label>
            <select
              value={filtroGenero}
              onChange={(e) => setFiltroGenero(e.target.value)}
              className="border p-2 rounded"
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
              className="border p-2 rounded"
            >
              <option>Todos</option>
              {faixasDisponiveis.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={apenasComRelatorio}
              onChange={(e) => setApenasComRelatorio(e.target.checked)}
            />
            <label>Apenas com relatório</label>
          </div>
        </div>

        {loading ? (
          <p>A carregar dados…</p>
        ) : (
          <>
            {/* GRÁFICOS ORIGINAIS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">Faixa Etária</h2>
                <Pie data={dadosFaixas} />
              </div>

              <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">Género</h2>
                <Pie data={dadosGeneros} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
              <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">Nível</h2>
                <Pie data={dadosNivel} />
              </div>

              <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">Score</h2>
                <Pie data={dadosScore} />
              </div>

              <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">Relatórios</h2>
                <Pie data={dadosRelatorios} />
              </div>
            </div>

            {/* NOVA SECÇÃO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">Relatórios por Mês</h2>
                <Bar data={dadosRelatoriosPorMes} />
              </div>

              <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">
                  Indicadores Comportamentais
                </h2>
                <ul className="list-disc ml-6 space-y-2">
                  <li>
                    Relatórios com logs: <b>{relatoriosComLogs}</b>
                  </li>
                  <li>
                    Score médio (com relatório):{" "}
                    <b>{scoreMedioComRelatorio}</b>
                  </li>
                </ul>
              </div>
            </div>

            {/* TABELA ORIGINAL */}
            <p className="mb-3">
              A mostrar <b>{utilizadoresFiltrados.length}</b> utilizadores.
            </p>

            <table className="w-full border border-gray-400">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Faixa Etária</th>
                  <th className="border p-2">Género</th>
                </tr>
              </thead>
              <tbody>
                {utilizadoresFiltrados.map((u) => (
                  <tr key={u.idUtilizador} className="text-center">
                    <td className="border p-2">{u.idUtilizador}</td>
                    <td className="border p-2">{u.idadeFaixa ?? "—"}</td>
                    <td className="border p-2">
                      {u.genero ?? "Não informado"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

// =======================
// 🔵 KPI COMPONENT
// =======================
function KPI({ titulo, valor }: { titulo: string; valor: number | string }) {
  return (
    <div className="bg-white p-6 shadow rounded text-center">
      <p className="text-gray-500">{titulo}</p>
      <p className="text-3xl font-bold">{valor}</p>
    </div>
  );
}
