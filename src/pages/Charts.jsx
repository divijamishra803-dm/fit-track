import { getWorkouts } from '../utils/storage'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function Charts() {
  const workouts = getWorkouts()

  const calByDate = workouts.reduce((acc, w) => {
    acc[w.date] = (acc[w.date] || 0) + Number(w.calories || 0)
    return acc
  }, {})
  const calData = Object.entries(calByDate).map(([date, calories]) => ({ date, calories }))

  const exCount = workouts.reduce((acc, w) => {
    acc[w.exercise] = (acc[w.exercise] || 0) + 1
    return acc
  }, {})
  const exData = Object.entries(exCount).map(([exercise, count]) => ({ exercise, count }))

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-black text-yellow-400 uppercase mb-6">Progress Charts</h2>

      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        <h3 className="text-white font-bold mb-4">Calories Burned Per Day</h3>
        {calData.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No data yet — log some workouts!</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={calData}>
              <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: '#1f2937', border: 'none', color: '#fff' }} />
              <Bar dataKey="calories" fill="#facc15" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-white font-bold mb-4">Most Frequent Exercises</h3>
        {exData.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No data yet — log some workouts!</p>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={exData} layout="vertical">
              <XAxis type="number" stroke="#9ca3af" tick={{ fontSize: 11 }} />
              <YAxis dataKey="exercise" type="category" stroke="#9ca3af" tick={{ fontSize: 11 }} width={80} />
              <Tooltip contentStyle={{ background: '#1f2937', border: 'none', color: '#fff' }} />
              <Bar dataKey="count" fill="#34d399" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}