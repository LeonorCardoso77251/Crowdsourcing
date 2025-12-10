import { useState } from "react";
import Papa from "papaparse";
import { api } from "../api/api";
import AdminNavbar from "../components/AdminNavbar";

export default function ImportarCSVPage() {
  const [ficheiro, setFicheiro] = useState<File | null>(null);
  const [mensagem, setMensagem] = useState("");

  const handleFicheiro = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFicheiro(e.target.files[0]);
    }
  };

  const importarCSV = () => {
    if (!ficheiro) {
      setMensagem("⚠️ Selecione um ficheiro CSV primeiro.");
      return;
    }

    Papa.parse(ficheiro, {
      header: true,
      complete: async (result) => {
        try {
          await api.post("/utilizadores/atualizar-csv", result.data);
          setMensagem("CSV importado com sucesso!");
        } catch  {
          setMensagem("Erro ao enviar CSV.");
        }
      },
    });
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Importar CSV</h1>

        <input type="file" accept=".csv" onChange={handleFicheiro} />

        <button
          onClick={importarCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Importar
        </button>

        {mensagem && <p className="mt-4 text-lg">{mensagem}</p>}
      </div>
    </>
  );
}
