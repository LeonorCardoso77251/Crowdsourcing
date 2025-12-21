import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081/api",
});

export const criarUtilizadorAnonimo = async () => {
  const response = await api.post("/utilizadores/anonimo");
  return response.data;
};


export const criarFormulario = async (userId: string | number) => {
  const response = await api.post(`/formularios/novo/${userId}`, null);
  return response.data;
};

export const obterUtilizadores = async () => {
  const response = await api.get("/utilizadores");
  return response.data;
};

export const obterAvaliacoes = async () => {
  const response = await api.get("/avaliacoes");
  return response.data;
};

export const obterRelatorios = async () => {
  const response = await api.get("/relatorios");
  return response.data;
};
