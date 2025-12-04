import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex gap-6 items-center">
      <Link to="/" className="font-bold hover:underline">
        Início
      </Link>

      <Link to="/formulario" className="hover:underline">
        Formulário
      </Link>

      <Link to="/dashboard" className="hover:underline">
        Dashboard
      </Link>
    </nav>
  );
}
