import { useEffect, useState } from "react";
import { obterUtilizadores } from "../api/api";
import AdminNavbar from "../components/AdminNavbar";

type Utilizador = {
  idUtilizador: number;
  idadeFaixa: string | null;
  genero: string | null;
};

export default function DashboardPage() {
  const [utilizadores, setUtilizadores] = useState<Utilizador[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <AdminNavbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">📊 Dashboard — Utilizadores</h1>

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
                  <td className="border border-gray-400 p-2">{u.idUtilizador}</td>
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
