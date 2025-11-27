import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Web Protótipo</h1>
      </nav>

      {/* Conteúdo principal centralizado */}
      <div className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-80px)] px-4">
        <h1 className="text-5xl font-bold mb-6">Bem-vindo</h1>
        <p className="text-lg text-gray-700 mb-10 max-w-md">
          Participe da nossa pesquisa e contribua com informações valiosas
        </p>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScjLoD_w-LjrrxBQd1pepofnVggK8SE_sZg8oH9Oaxrb_0iBg/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Preencher Formulário Externo
          </a>

          <Link
            to="/formularios/preencher/1"
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Preencher Formulário Interno
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
