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
import axios from 'axios'

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
  const [stats, setStats] = useState({
    totalTemplates: 0,
    totalUsers: 0,
    totalEvents: 0,
    totalInvitations: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [templatesRes, usersRes, eventsRes, guestsRes] =
          await Promise.all([
            axios.get('http://localhost:3000/api/templates'),
            axios.get('http://localhost:3000/api/users/'),
          ])

        setStats({
          totalTemplates: templatesRes.data.data.length,
          totalUsers: usersRes.data.data.length,
          totalEvents: 0,
          totalInvitations: 0,
        })
      } catch (error) {
        // Puedes mostrar un error visual si lo deseas
      }
    }
    fetchStats()
  }, [])

  // Para las gráficas, asume que todas las invitaciones fueron creadas en agosto
  const totalEvents = stats.totalEvents
  const pieData = {
    labels: ['Agosto'],
    datasets: [
      {
        data: [totalEvents],
        backgroundColor: ['#ec4899'],
        borderWidth: 1,
      },
    ],
  }

  const barData = {
    labels: ['Agosto'],
    datasets: [
      {
        label: 'Eventos creados',
        data: [0, 0, 0, 0, 0, 0, 0, totalEvents, 0, 0, 0, 0],
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
            Eventos creados por categoría (Agosto)
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
  )
}

export default AdminHome
