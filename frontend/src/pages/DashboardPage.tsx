import Navbar from "../components/Navbar";

export default function DashboardPage() {
  return (
    <div>
      <Navbar />

      <div className="p-8">
        <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>

        <p className="mt-4 text-lg">
          Aqui vais mostrar gráficos, relatórios e estatísticas.
        </p>
      </div>
    </div>
  );
}
