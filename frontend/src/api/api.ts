import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081/api",
});

// =======================
// UTILIZADORES
// =======================

// Criar utilizador anónimo
export const criarUtilizadorAnonimo = async () => {
  const response = await api.post("/utilizadores/anonimo");
  return response.data;
};

// Criar formulário para um utilizador (USADO NO SITE)
export const criarFormulario = async (userId: string | number) => {
  const response = await api.post(`/formularios/novo/${userId}`, null);
  return response.data;
};

// Obter utilizadores
export const obterUtilizadores = async () => {
  const response = await api.get("/utilizadores");
  return response.data;
};

// =======================
// DASHBOARD (NOVO – SEM PARTIR NADA)
// =======================

// Avaliações (tabela avaliacao)
export const obterAvaliacoes = async () => {
  const response = await api.get("/avaliacoes");
  return response.data;
};

// Relatórios (tabela relatorio)
export const obterRelatorios = async () => {
  const response = await api.get("/relatorios");
  return response.data;
};
