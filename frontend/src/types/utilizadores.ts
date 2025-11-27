// src/types/utilizador.ts
// src/types/utilizador.ts
export type Classificacao = object; 
export type Formulario = object; 
export type Resposta = object; 
export type Mapeamento = object;

export interface Utilizador {
  idUtilizador: number;
  idadeFaixa: string;
  genero: string;
  classificacoes?: Classificacao[];
  formularios?: Formulario[];
  respostas?: Resposta[];
  mapeamentos?: Mapeamento[];
}


