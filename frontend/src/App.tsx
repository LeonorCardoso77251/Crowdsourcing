import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FormulariosList from "./pages/FormulariosList";
import FormularioFill from "./pages/FormularioFill";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formularios" element={<FormulariosList />} />
          {/* Rota dinâmica para preencher formulário */}
          <Route path="/formularios/preencher/:usuarioId" element={<FormularioFillWrapper />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// Wrapper para extrair o id do utilizador da URL
import { useParams } from "react-router-dom";
function FormularioFillWrapper() {
  const { usuarioId } = useParams<{ usuarioId: string }>();
  if (!usuarioId) return <p>Utilizador inválido</p>;

  return <FormularioFill usuarioId={Number(usuarioId)} />;
}
