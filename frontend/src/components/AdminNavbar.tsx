import { Link, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin"); 
    navigate("/"); 
  };

  return (
    <nav className="bg-red-600 text-white px-8 py-4 flex gap-6 items-center">
      
      <Link to="/" className="font-bold hover:underline">
        Início
      </Link>

      <Link to="/dashboard" className="hover:underline">
        Dashboard General
      </Link>

      {/*BOTÃO FORMULÁRIO 
      /<Link to="/formulario" className="hover:underline">
        Formulário
      </Link>*/}
      {/* Botão Dashboard Comportamental */}
      <Link to="/dashboard/behavioral">
        Dashboard Comportamental
      </Link>

      {/* Botão Logout  */}
      <button
        onClick={logout}
        className="ml-auto bg-red-600 hover:bg-red-600 px-4 py-2 rounded text-white"
      >
        Logout
      </button>
    </nav>
  );
}
