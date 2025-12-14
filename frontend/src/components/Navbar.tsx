import { Link } from "react-router-dom";

export default function Navbar() {
  const isAdmin = localStorage.getItem("admin") === "true";

  return (
    <nav className="bg-red-600 text-white px-8 h-16 flex items-center justify-between">
      
      {/* LOGO CLICÁVEL */}
      <Link to="/" className="flex items-center h-full">
        <img
          src="/img/logo.png"
          alt="Logotipo"
          className="h-12 w-auto object-contain"
        />
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
