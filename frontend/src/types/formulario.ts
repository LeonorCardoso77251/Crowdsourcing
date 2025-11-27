export interface Formulario {
  idFormulario?: number; // opcional ao criar
  pergunta1: string;
  pergunta2: string;
  utilizador: { idUtilizador: number }; // só precisa do id
}




