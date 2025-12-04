import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081/api",
});

// Criar utilizador anónimo
export const criarUtilizadorAnonimo = async () => {
  const response = await api.post("/utilizadores/anonimo");
  return response.data;
};

// Criar formulário para um utilizador (IMPORTANTE: body = null!!)
export const criarFormulario = async (userId: string | number) => {
  const response = await api.post(`/formularios/novo/${userId}`, null);
  return response.data;
};
