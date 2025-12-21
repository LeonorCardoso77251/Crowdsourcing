import { Link } from "react-router-dom";

type NavbarProps = {
  showActions?: boolean;
};

export default function Navbar({ showActions = true }: NavbarProps) {
  const isAdmin = localStorage.getItem("admin") === "true";

  return (
    <nav className="bg-red-600 text-white px-8 h-16 flex items-center justify-between">
      
      {/* LADO ESQUERDO */}
      {showActions ? (
        <Link
          to="/"
          className="flex items-center h-full px-4 py-2 text-sm font-medium
                     text-white bg-red-600 rounded hover:bg-red-700 transition"
        >
          Início
        </Link>
      ) : (
        <div /> // mantém o espaçamento
      )}

      {/* LADO DIREITO */}
      {showActions && (
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
      )}
    </nav>
  );
}
