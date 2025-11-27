// src/services/utilizadorService.ts
import type { Utilizador } from '../types/utilizadores';

const BASE_URL = 'http://localhost:8081/utilizadores';

export const getAllUtilizadores = async (): Promise<Utilizador[]> => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Erro ao buscar utilizadores');
  return response.json();
};

export const getUtilizadorById = async (id: number): Promise<Utilizador> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar utilizador');
  return response.json();
};
