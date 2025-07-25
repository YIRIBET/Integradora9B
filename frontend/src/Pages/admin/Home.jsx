import { useEffect, useState } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
)

function AdminHome() {
  // Datos mock para el dashboard
  const [stats, setStats] = useState({
    totalTemplates: 24,
    totalUsers: 120,
    totalEvents: 45,
    totalInvitations: 320,
    templatesByCategory: {
      Boda: 8,
      Cumpleaños: 6,
      Graduaciones: 4,
      Corporativo: 3,
      Otros: 3,
    },
    templatesByMonth: {
      Enero: 2,
      Febrero: 3,
      Marzo: 4,
      Abril: 5,
      Mayo: 6,
      Junio: 4,
    },
  })

  // Configuración de la gráfica de pastel
  const pieData = {
    labels: Object.keys(stats.templatesByCategory),
    datasets: [
      {
        data: Object.values(stats.templatesByCategory),
        backgroundColor: [
          '#ec4899',
          '#fbbf24',
          '#10b981',
          '#3b82f6',
          '#a78bfa',
        ],
        borderWidth: 1,
      },
    ],
  }

  // Configuración de la gráfica de barras
  const barData = {
    labels: Object.keys(stats.templatesByMonth),
    datasets: [
      {
        label: 'Plantillas creadas',
        data: Object.values(stats.templatesByMonth),
        backgroundColor: '#ec4899',
      },
    ],
  }

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
            Usos de Plantillas por Categoría
          </h2>
          <Pie data={pieData} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-pink-500">
            Plantillas creadas por mes
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
  )
}

export default AdminHome
