import { Link } from "react-router-dom";

export default function Navbar() {
  const isAdmin = localStorage.getItem("admin") === "true";

  return (
    <nav className="bg-red-600 text-white px-8 h-16 flex items-center justify-between">
      
      {/* BOTÃO Inicio*/}
      <Link
        to="/"
        className="flex items-center h-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition"
      >
        Início
      </Link>
      {/* ÁREA ADMIN */}
      <div>
        {!isAdmin ? (
          <Link to="/login" className="hover:underline">
            Área Admin
          </Link>
        ) : (
          <Link to="/dashboard" className="hover:underline">
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
}
