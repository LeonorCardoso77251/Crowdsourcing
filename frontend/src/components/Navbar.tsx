import { Link } from "react-router-dom";

export default function Navbar() {
  const isAdmin = localStorage.getItem("admin") === "true";

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex gap-6 items-center justify-between">
      
      {/* Lado esquerdo → Início */}
      <div className="flex gap-6">
        <Link to="/" className="font-bold hover:underline">
          Início
        </Link>
      </div>

      {/* Lado direito → Login/Admin */}
      <div>
        {!isAdmin ? (
          <Link 
            to="/login" 
            className="hover:underline"
          >
            Área Admin
          </Link>
        ) : (
          <Link 
            to="/dashboard"
            className="hover:underline"
          >
            Admin
          </Link>
        )}
      </div>

    </nav>
  );
}
