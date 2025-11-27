// src/services/formularioService.ts
import type { Formulario } from "../types/formulario";

const API_URL = "http://localhost:8081/api/formularios";

export async function getFormularios(): Promise<Formulario[]> {
  const response = await fetch(API_URL);
  return response.json();
}

export async function createFormulario(data: Partial<Formulario>): Promise<Formulario> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar o formulário");
  }

  return response.json();
}
