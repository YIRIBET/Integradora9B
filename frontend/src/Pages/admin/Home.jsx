import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import axios from "axios";
const API_BASE_URL = "http://localhost:3000/api";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function AdminHome() {
  const [stats, setStats] = useState({
    totalTemplates: 0,
    totalUsers: 0,
    totalEvents: 0,
    totalInvitations: 0,
  });
  const [categoryStats, setCategoryStats] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [monthStats, setMonthStats] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          templatesRes,
          usersRes,
          eventsRes,
          guestsRes,
          templatesStatsRes,
          createdByMonthRes,
        ] = await Promise.all([
          axios.get(`${API_BASE_URL}/templates`),
          axios.get(`${API_BASE_URL}/users/`),
          axios.get(`${API_BASE_URL}/invitation/`),
          axios.get(`${API_BASE_URL}/guest/`),
          axios.get(`${API_BASE_URL}/templates/templates-stats`),
          axios.get(`${API_BASE_URL}/templates/created-by-month`),
        ]);

        setStats({
          totalTemplates: templatesRes.data.data.length,
          totalUsers: usersRes.data.data.length,
          totalEvents: eventsRes.data.data.length,
          totalInvitations: guestsRes.data.data.length,
        });

        if (
          templatesStatsRes.data &&
          templatesStatsRes.data.data &&
          Array.isArray(templatesStatsRes.data.data.labels)
        ) {
          setCategoryStats({
            labels: templatesStatsRes.data.data.labels,
            datasets: [
              {
                data: templatesStatsRes.data.data.datasets[0].data,
                backgroundColor: [
                  "#ec4899",
                  "#fbbf24",
                  "#10b981",
                  "#3b82f6",
                  "#a78bfa",
                  "#6366f1",
                  "#f472b6",
                  "#60a5fa",
                  "#f87171",
                  "#34d399",
                  "#facc15",
                  "#a3e635",
                ],
                borderWidth: 1,
              },
            ],
          });
        }

        if (
          createdByMonthRes.data &&
          createdByMonthRes.data.data &&
          Array.isArray(createdByMonthRes.data.data.labels)
        ) {
          setMonthStats({
            labels: createdByMonthRes.data.data.labels,
            datasets: [
              {
                label: createdByMonthRes.data.data.datasets[0].label,
                data: createdByMonthRes.data.data.datasets[0].data,
                backgroundColor: "#ec4899",
              },
            ],
          });
        }
      } catch (error) {
        // Puedes mostrar un error visual si lo deseas
      }
    };
    fetchStats();
  }, []);

  // Para las gráficas, asume que todas las invitaciones fueron creadas en agosto
  const totalEvents = stats.totalEvents;

  // Pie chart: eventos creados por categoría (de la API)
  const pieData = {
    labels: categoryStats.labels.length > 0 ? categoryStats.labels : ["Agosto"],
    datasets:
      categoryStats.datasets[0].data.length > 0
        ? categoryStats.datasets
        : [
            {
              data: [stats.totalEvents],
              backgroundColor: ["#ec4899"],
              borderWidth: 1,
            },
          ],
  };

  // Bar chart: eventos creados por mes (de la API)
  const barData = {
    labels:
      monthStats.labels.length > 0
        ? monthStats.labels
        : [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
          ],
    datasets:
      monthStats.datasets[0].data.length > 0
        ? monthStats.datasets
        : [
            {
              label: "Eventos creados",
              data: [0, 0, 0, 0, 0, 0, 0, stats.totalEvents, 0, 0, 0, 0],
              backgroundColor: "#ec4899",
            },
          ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-pink-500 mb-6">
        Dashboard de Administración
      </h1>
      {/* Tarjetas de totales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-pink-500">
            {stats.totalTemplates}
          </div>
          <div className="text-gray-600">Total de Plantillas</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-pink-500">
            {stats.totalUsers}
          </div>
          <div className="text-gray-600">Total de Usuarios</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-pink-500">
            {stats.totalEvents}
          </div>
          <div className="text-gray-600">Total de Eventos</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-pink-500">
            {stats.totalInvitations}
          </div>
          <div className="text-gray-600">Invitaciones Enviadas</div>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-pink-500">
            Eventos creados por categoría
          </h2>
          <Pie data={pieData} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-pink-500">
            Eventos creados por mes
          </h2>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: false },
              },
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
