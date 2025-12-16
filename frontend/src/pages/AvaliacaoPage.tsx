import Navbar from "../components/Navbar";

export default function AvaliacaoPage() {
  return (
    <div>
      <Navbar />

      <div className="p-8 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-6">
          Obrigado pela sua participação
        </h1>

        <p className="text-lg mb-6">
          A sua colaboração foi fundamental para o desenvolvimento deste estudo
          académico. As respostas fornecidas contribuirão para a análise da
          interação dos utilizadores com alertas e mensagens de suporte em
          ambientes web.
        </p>

        <div className="bg-red-50 border border-red-300 p-6 rounded-lg text-left">
          <h2 className="text-xl font-semibold mb-4">
            Avaliação preliminar
          </h2>

          <p className="mb-4">
            Com base nas suas respostas ao questionário e nos padrões de
            interação observados durante a utilização do rato (como cliques,
            pausas e movimentos), foram identificados alguns indicadores que
            poderão justificar uma atenção acrescida ao seu bem-estar
            psicológico.
          </p>

          <p className="mb-4">
            Este resultado <strong>não constitui um diagnóstico médico</strong>.
            No entanto, caso se identifique com esta descrição ou sinta algum
            desconforto emocional, recomenda-se a procura de um profissional de
            saúde qualificado.
          </p>

          <p className="text-sm text-gray-600">
            Nota: Esta avaliação baseia-se em modelos experimentais e será
            refinada à medida que o estudo evoluir.
          </p>
        </div>
      </div>
    </div>
  );
}
