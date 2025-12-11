import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin"); // removemos sessão
    navigate("/"); // redireciona
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex gap-6 items-center">
      <Link to="/" className="font-bold hover:underline">
        Início
      </Link>

      <Link to="/dashboard" className="hover:underline">
        Dashboard
      </Link>

      <Link to="/admin/importar" className="hover:underline">
        Importar CSV
      </Link>

      {/* Botão Logout alinhado à direita */}
      <button
        onClick={logout}
        className="ml-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
      >
        Logout
      </button>
    </nav>
  );
}
