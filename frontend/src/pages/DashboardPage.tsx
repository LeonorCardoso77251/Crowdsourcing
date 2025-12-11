import { useEffect, useState, useMemo } from "react";
import { obterUtilizadores } from "../api/api";
import AdminNavbar from "../components/AdminNavbar";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Utilizador = {
  idUtilizador: number;
  idadeFaixa: string | null;
  genero: string | null;
};

export default function DashboardPage() {
  const [utilizadores, setUtilizadores] = useState<Utilizador[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔵 Filtros
  const [filtroGenero, setFiltroGenero] = useState("Todos");
  const [filtroFaixa, setFiltroFaixa] = useState("Todos");

  // ============================
  // 🔵 CARREGAR UTILIZADORES
  // ============================
  useEffect(() => {
    const carregar = async () => {
      try {
        const data = await obterUtilizadores();
        setUtilizadores(data);
      } catch (error) {
        console.error("Erro ao carregar utilizadores:", error);
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, []);

  // ============================
  // 🔵 LISTAS BASE
  // ============================

  const faixas = [
    "18 a 25 anos",
    "26 a 35 anos",
    "36 a 45 anos",
    "46 a 55 anos",
    "56+ anos"
  ];

  // ============================
  // 🔵 GRÁFICO DE FAIXAS ETÁRIAS
  // ============================

  const utilizadoresParaFaixas = useMemo(() => {
    if (filtroFaixa === "Todos") return utilizadores;

    return utilizadores.filter(
      (u: Utilizador) => u.idadeFaixa === filtroFaixa
    );
  }, [utilizadores, filtroFaixa]);

  const faixasCount = faixas.map(
    (f) =>
      utilizadoresParaFaixas.filter(
        (u: Utilizador) => u.idadeFaixa === f
      ).length
  );

  const dadosFaixas = {
    labels: faixas,
    datasets: [
      {
        data: faixasCount,
        backgroundColor: ["#4A90E2", "#50E3C2", "#B8E986", "#F8E71C", "#D0021B"]
      }
    ]
  };

  // ============================
  // 🔵 GRÁFICO DE GÉNERO
  // ============================

  const utilizadoresParaGeneros = useMemo(() => {
    if (filtroGenero === "Todos") return utilizadores;

    return utilizadores.filter(
      (u: Utilizador) => (u.genero ?? "Não informado") === filtroGenero
    );
  }, [utilizadores, filtroGenero]);

  const generosCount: Record<string, number> = {
    Feminino: 0,
    Masculino: 0,
    Outro: 0,
    "Não informado": 0
  };

  utilizadoresParaGeneros.forEach((u: Utilizador) => {
    const g = u.genero ?? "Não informado";
    generosCount[g] = (generosCount[g] || 0) + 1;
  });

  const dadosGeneros = {
    labels: Object.keys(generosCount),
    datasets: [
      {
        data: Object.values(generosCount),
        backgroundColor: ["#BD10E0", "#7ED321", "#F5A623", "#4A90E2"]
      }
    ]
  };

  // ============================
  // 🔵 RENDER
  // ============================

  return (
    <>
      <AdminNavbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">📊 Dashboard — Utilizadores</h1>

        {/* FILTROS */}
        <div className="flex flex-wrap gap-6 mb-10">
          {/* Filtro de Género */}
          <div>
            <label className="font-semibold block mb-2">
              Filtrar gráfico de Género:
            </label>
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

          {/* Filtro de Faixa Etária */}
          <div>
            <label className="font-semibold block mb-2">
              Filtrar gráfico de Faixa Etária:
            </label>
            <select
              value={filtroFaixa}
              onChange={(e) => setFiltroFaixa(e.target.value)}
              className="border p-2 rounded"
            >
              <option>Todos</option>
              {faixas.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        {/* GRÁFICOS */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            {/* Gráfico Etário */}
            <div className="bg-white p-6 shadow-md rounded">
              <h2 className="text-xl font-semibold mb-4">
                Distribuição por Faixa Etária
              </h2>
              <Pie data={dadosFaixas} />
            </div>

            {/* Gráfico de Género */}
            <div className="bg-white p-6 shadow-md rounded">
              <h2 className="text-xl font-semibold mb-4">
                Distribuição por Género
              </h2>
              <Pie data={dadosGeneros} />
            </div>
          </div>
        )}

        {/* TABELA */}
        {loading ? (
          <p className="text-gray-600 text-lg">A carregar utilizadores...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-400">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-400 p-2">ID</th>
                <th className="border border-gray-400 p-2">Faixa Etária</th>
                <th className="border border-gray-400 p-2">Género</th>
              </tr>
            </thead>

            <tbody>
              {utilizadores.map((u) => (
                <tr key={u.idUtilizador} className="text-center">
                  <td className="border border-gray-400 p-2">
                    {u.idUtilizador}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {u.idadeFaixa ?? "—"}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {u.genero ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
