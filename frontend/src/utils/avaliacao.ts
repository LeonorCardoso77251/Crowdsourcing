// src/utils/avaliacao.ts

export type NivelAtivacao =
  | "Baixa ativação comportamental"
  | "Ativação comportamental moderada"
  | "Ativação comportamental elevada";

export interface ResultadoAvaliacao {
  scoreTotal: number;
  nivel: NivelAtivacao;
  descricao: string;
}

// Escala comum imagem → score
const imageScores: Record<string, number> = {
  "/img/img1.png": 0,
  "/img/img4.png": 0,

  "/img/img6.png": 1,
  "/img/img7.png": 1,

  "/img/img2.png": 2,
  "/img/img5.png": 2,
  "/img/img8.png": 2,

  "/img/img3.png": 3,
  "/img/img9.png": 3,
  "/img/img10.png": 3,
};

function scoreImagem(imagem: string | null): number {
  if (!imagem) return 0;
  return imageScores[imagem] ?? 0;
}

export function calcularAvaliacao(respostas: {
  pergunta1: string | null;
  pergunta2: string | null;
  pergunta3: string | null;
}): ResultadoAvaliacao {
  const scoreTotal =
    scoreImagem(respostas.pergunta1) +
    scoreImagem(respostas.pergunta2) +
    scoreImagem(respostas.pergunta3);

  if (scoreTotal <= 2) {
    return {
      scoreTotal,
      nivel: "Baixa ativação comportamental",
      descricao:
        "O seu padrão de movimento percebido apresenta baixa intensidade e boa estabilidade.",
    };
  }

  if (scoreTotal <= 5) {
    return {
      scoreTotal,
      nivel: "Ativação comportamental moderada",
      descricao:
        "O seu padrão de movimento percebido apresenta alguma irregularidade e intensidade.",
    };
  }

  return {
    scoreTotal,
    nivel: "Ativação comportamental elevada",
    descricao:
      "O seu padrão de movimento percebido apresenta elevada intensidade e irregularidade.",
  };
}

