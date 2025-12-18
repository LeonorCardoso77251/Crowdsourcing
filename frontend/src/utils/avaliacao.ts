// src/utils/avaliacao.ts

export type NivelAtivacao =
  | "Ativação comportamental baixa"
  | "Ativação comportamental moderada"
  | "Ativação comportamental elevada";

export interface ResultadoAvaliacao {
  scoreTotal: number;
  nivel: NivelAtivacao;
  descricao: string;
}

// Scores atribuídos a cada imagem
const imageScores: Record<string, number> = {
  "/img/img8.png": 0,

  "/img/img1.png": 1,
  "/img/img5.png": 1,
  "/img/img7.png": 1,

  "/img/img4.png": 2,
  "/img/img9.png": 2,

  "/img/img2.png": 3,
  "/img/img3.png": 3,
  "/img/img6.png": 3,
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

  //Baixa ativação comportamental
  if (scoreTotal <= 2) {
    return {
      scoreTotal,
      nivel: "Ativação comportamental baixa",
      descricao:
        "Com base nas imagens selecionadas, o seu padrão de interação caracteriza-se por movimentos do rato mais simples e controlados, com trajetos relativamente regulares. Este resultado sugere uma forma de interação mais estável e previsível com a interface durante o questionário.",
    };
  }

  //Ativação comportamental moderada
  if (scoreTotal <= 5) {
    return {
      scoreTotal,
      nivel: "Ativação comportamental moderada",
      descricao:
        "As imagens escolhidas indicam um padrão de movimento do rato com alguma variação, alternando entre momentos mais controlados e outros com maior mudança de direção. Este resultado reflete um nível intermédio de ativação comportamental durante a interação com o questionário.",
    };
  }

  // Ativação comportamental elevada
  return {
    scoreTotal,
    nivel: "Ativação comportamental elevada",
    descricao:
      "De acordo com as imagens selecionadas, o padrão de movimento do rato apresenta maior irregularidade e diversidade de trajetos. Este resultado indica uma interação mais dinâmica com a interface durante o preenchimento do questionário.",
  };
}
