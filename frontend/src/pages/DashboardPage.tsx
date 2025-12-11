import { useEffect, useState, useMemo } from "react";
import { obterUtilizadores, api } from "../api/api";
import AdminNavbar from "../components/AdminNavbar";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// =====================
// TIPOS
// =====================
type Utilizador = {
  idUtilizador: number;
  idadeFaixa: string | null;
  genero: string | null;
};

type Resposta = {
  resposta1: string | null;
  resposta2: string | null;
  resposta3: string | null;
};

// =====================
// COMPONENTE PRINCIPAL
// =====================
export default function DashboardPage() {
  const [utilizadores, setUtilizadores] = useState<Utilizador[]>([]);
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔵 Filtros demográficos
  const [filtroGenero, setFiltroGenero] = useState("Todos");
  const [filtroFaixa, setFiltroFaixa] = useState("Todos");

  // 🔵 Filtros das perguntas
  const [filtroP1, setFiltroP1] = useState("Todos");
  const [filtroP2, setFiltroP2] = useState("Todos");
  const [filtroP3, setFiltroP3] = useState("Todos");

  // 🔵 LISTAS FIXAS DE IMAGENS (APARECEM SEMPRE NOS FILTROS)
  const imagensP1 = [
    "/img/img1.png",
    "/img/img2.png",
    "/img/img3.png",
    "/img/img4.png",
    "/img/img5.png",
    "/img/img6.png"
  ];

  const imagensP2 = [
    "/img/img4.png",
    "/img/img1.png",
    "/img/img6.png",
    "/img/img2.png",
    "/img/img5.png",
    "/img/img3.png"
  ];

  const imagensP3 = [
    "/img/img2.png",
    "/img/img5.png",
    "/img/img1.png",
    "/img/img6.png",
    "/img/img3.png",
    "/img/img4.png"
  ];

  // Só para aparecer "Imagem 1", etc.
  function labelImagem(path: string): string {
    const match = path.match(/img(\d+)\./);
    return match ? `Imagem ${match[1]}` : path;
  }

  // ============================
  // 🔵 CARREGAR DADOS
  // ============================
  useEffect(() => {
    const carregar = async () => {
      try {
        const users = await obterUtilizadores();
        const resp = await api.get("/respostas");

        setUtilizadores(users);
        setRespostas(resp.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  // ============================
  // 🔵 FILTROS DEMOGRÁFICOS (GRÁFICOS DE UTILIZADORES)
  // ============================

  const faixas = [
    "18 a 25 anos",
    "26 a 35 anos",
    "36 a 45 anos",
    "46 a 55 anos",
    "56+ anos"
  ];

  const utilizadoresParaFaixas = useMemo(() => {
    return filtroFaixa === "Todos"
      ? utilizadores
      : utilizadores.filter((u) => u.idadeFaixa === filtroFaixa);
  }, [utilizadores, filtroFaixa]);

  const faixasCount = faixas.map(
    (f) => utilizadoresParaFaixas.filter((u) => u.idadeFaixa === f).length
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

  const utilizadoresParaGeneros = useMemo(() => {
    return filtroGenero === "Todos"
      ? utilizadores
      : utilizadores.filter(
          (u) => (u.genero ?? "Não informado") === filtroGenero
        );
  }, [utilizadores, filtroGenero]);

  const generosCount = {
    Feminino: 0,
    Masculino: 0,
    Outro: 0,
    "Não informado": 0
  };

utilizadoresParaGeneros.forEach((u) => {
  const genero = (u.genero ?? "Não informado") as keyof typeof generosCount;
  generosCount[genero]++;
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
  // 🔵 CONTAGEM DAS RESPOSTAS (COM FILTRO POR PERGUNTA)
  // ============================
  function contarRespostas(
    campo: keyof Resposta,
    filtroImagem: string
  ): Record<string, number> {
    const contagem: Record<string, number> = {};

    respostas.forEach((r) => {
      const valor = r[campo];
      if (!valor) return;

      if (filtroImagem !== "Todos" && valor !== filtroImagem) return;

      contagem[valor] = (contagem[valor] || 0) + 1;
    });

    return contagem;
  }

  const dadosPergunta1 = {
    labels: Object.keys(contarRespostas("resposta1", filtroP1)),
    datasets: [
      {
        data: Object.values(contarRespostas("resposta1", filtroP1)),
        backgroundColor: ["#4A90E2", "#50E3C2", "#D0021B", "#F8E71C", "#7ED321", "#BD10E0"]
      }
    ]
  };

  const dadosPergunta2 = {
    labels: Object.keys(contarRespostas("resposta2", filtroP2)),
    datasets: [
      {
        data: Object.values(contarRespostas("resposta2", filtroP2)),
        backgroundColor: ["#BD10E0", "#7ED321", "#4A90E2", "#F5A623", "#50E3C2", "#D0021B"]
      }
    ]
  };

  const dadosPergunta3 = {
    labels: Object.keys(contarRespostas("resposta3", filtroP3)),
    datasets: [
      {
        data: Object.values(contarRespostas("resposta3", filtroP3)),
        backgroundColor: ["#F8E71C", "#4A90E2", "#50E3C2", "#BD10E0", "#D0021B", "#7ED321"]
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
        <h1 className="text-3xl font-bold mb-6">📊 Dashboard — Estatísticas</h1>

        {/* FILTROS DEMOGRÁFICOS */}
        <div className="flex flex-wrap gap-6 mb-10">
          <div>
            <label className="font-semibold block mb-2">Filtrar Género:</label>
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
            <label className="font-semibold block mb-2">Filtrar Faixa Etária:</label>
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

        {/* GRÁFICOS DEMOGRÁFICOS */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div className="bg-white p-6 shadow-md rounded">
              <h2 className="text-xl font-semibold mb-4">Distribuição por Faixa Etária</h2>
              <Pie data={dadosFaixas} />
            </div>

            <div className="bg-white p-6 shadow-md rounded">
              <h2 className="text-xl font-semibold mb-4">Distribuição por Género</h2>
              <Pie data={dadosGeneros} />
            </div>
          </div>
        )}

        {/* FILTROS DAS PERGUNTAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-6">
          <div>
            <label className="font-semibold block mb-2">Pergunta 1 — Filtrar Imagem</label>
            <select value={filtroP1} onChange={(e) => setFiltroP1(e.target.value)} className="border p-2 rounded w-full">
              <option value="Todos">Todos</option>
              {imagensP1.map((img) => (
                <option key={img} value={img}>{labelImagem(img)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2">Pergunta 2 — Filtrar Imagem</label>
            <select value={filtroP2} onChange={(e) => setFiltroP2(e.target.value)} className="border p-2 rounded w-full">
              <option value="Todos">Todos</option>
              {imagensP2.map((img) => (
                <option key={img} value={img}>{labelImagem(img)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2">Pergunta 3 — Filtrar Imagem</label>
            <select value={filtroP3} onChange={(e) => setFiltroP3(e.target.value)} className="border p-2 rounded w-full">
              <option value="Todos">Todos</option>
              {imagensP3.map((img) => (
                <option key={img} value={img}>{labelImagem(img)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* GRÁFICOS DAS PERGUNTAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div className="bg-white p-6 shadow-md rounded">
            <h2 className="text-xl font-semibold mb-4">Pergunta 1 — Mobilidade</h2>
            <Pie data={dadosPergunta1} />
          </div>

          <div className="bg-white p-6 shadow-md rounded">
            <h2 className="text-xl font-semibold mb-4">Pergunta 2 — Autoavaliação</h2>
            <Pie data={dadosPergunta2} />
          </div>

          <div className="bg-white p-6 shadow-md rounded">
            <h2 className="text-xl font-semibold mb-4">Pergunta 3 — Movimento Natural</h2>
            <Pie data={dadosPergunta3} />
          </div>
        </div>

        {/* TABELA */}
        <table className="w-full border-collapse border border-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Faixa Etária</th>
              <th className="border p-2">Género</th>
            </tr>
          </thead>

          <tbody>
            {utilizadores.map((u) => (
              <tr key={u.idUtilizador} className="text-center">
                <td className="border p-2">{u.idUtilizador}</td>
                <td className="border p-2">{u.idadeFaixa ?? "—"}</td>
                <td className="border p-2">{u.genero ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
