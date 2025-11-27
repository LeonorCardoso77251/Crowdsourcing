// src/pages/FormulariosList.tsx
import { useEffect, useState } from "react";
import type { Formulario } from "../types/formulario";
import { getFormularios } from "../services/formularioService";

export default function FormulariosList() {
  const [formularios, setFormularios] = useState<Formulario[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getFormularios();
      setFormularios(data);
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Lista de Formulários</h1>

      <ul className="space-y-3">
        {formularios.map((form) => (
          <li key={form.idFormulario} className="p-4 border rounded">
            <p><strong>Pergunta 1:</strong> {form.pergunta1}</p>
            <p><strong>Pergunta 2:</strong> {form.pergunta2}</p>
            <p><strong>ID Utilizador:</strong> {form.utilizador?.idUtilizador ?? "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
