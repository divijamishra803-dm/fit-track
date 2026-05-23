import { useState } from 'react'
import { saveWorkout, getWorkouts, getStreak } from '../utils/storage'

const caloriesPerMinute = {
  'running': 10, 'cycling': 8, 'swimming': 9, 'walking': 4,
  'push ups': 5, 'pull ups': 6, 'squats': 5, 'plank': 3,
  'jumping jacks': 7, 'yoga': 3, 'weightlifting': 6,
  'hiit': 12, 'skipping': 11, 'dancing': 6, 'sit ups': 4,
}

function estimateCalories(exercise, duration) {
  if (!exercise || !duration) return 0
  const key = exercise.toLowerCase().trim()
  const match = Object.keys(caloriesPerMinute).find(k => key.includes(k))
  const rate = match ? caloriesPerMinute[match] : 5
  return Math.round(rate * Number(duration))
}

export default function Dashboard() {
  const [workouts, setWorkouts] = useState(getWorkouts())
  const [form, setForm] = useState({ exercise: '', sets: '', reps: '', duration: '', calories: 0 })

  function handleChange(field, value) {
    const updated = { ...form, [field]: value }
    updated.calories = estimateCalories(
      field === 'exercise' ? value : updated.exercise,
      field === 'duration' ? value : updated.duration
    )
    setForm(updated)
  }

  function handleAdd() {
    if (!form.exercise) return
    saveWorkout(form)
    setWorkouts(getWorkouts())
    setForm({ exercise: '', sets: '', reps: '', duration: '', calories: 0 })
  }

  function deleteWorkout(id) {
    const updated = workouts.filter(w => w.id !== id)
    localStorage.setItem('workouts', JSON.stringify(updated))
    setWorkouts(updated)
  }

  const totalCalories = workouts.reduce((sum, w) => sum + (Number(w.calories) || 0), 0)
  const streak = getStreak()

  return (
    <div className="max-w-2xl mx-auto p-6">

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <p className="text-yellow-400 text-2xl font-black">{workouts.length}</p>
          <p className="text-gray-400 text-xs uppercase mt-1">Workouts</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <p className="text-orange-400 text-2xl font-black">{totalCalories}</p>
          <p className="text-gray-400 text-xs uppercase mt-1">Kcal Burned</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <p className="text-red-400 text-2xl font-black">{streak} 🔥</p>
          <p className="text-gray-400 text-xs uppercase mt-1">Day Streak</p>
        </div>
      </div>

      {/* Log Form */}
      <div className="bg-gray-800 rounded-xl p-5 mb-6">
        <h2 className="text-white font-black uppercase tracking-wide mb-4">Log a Workout</h2>
        <input className="w-full bg-gray-700 text-white rounded-lg p-3 mb-3 outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Exercise name (e.g. running, squats)"
          value={form.exercise} onChange={e => handleChange('exercise', e.target.value)} />
        <div className="grid grid-cols-3 gap-2 mb-3">
          <input className="bg-gray-700 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Sets" value={form.sets} onChange={e => handleChange('sets', e.target.value)} />
          <input className="bg-gray-700 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Reps" value={form.reps} onChange={e => handleChange('reps', e.target.value)} />
          <input className="bg-gray-700 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Mins" type="number" value={form.duration} onChange={e => handleChange('duration', e.target.value)} />
        </div>

        {form.calories > 0 && (
          <div className="bg-orange-900 border border-orange-500 rounded-lg p-3 mb-3 text-center">
            <p className="text-orange-300 text-xs uppercase">Estimated calories</p>
            <p className="text-orange-400 text-2xl font-black">{form.calories} kcal</p>
          </div>
        )}

        <button onClick={handleAdd}
          className="w-full bg-yellow-400 text-gray-900 font-black py-3 rounded-lg uppercase tracking-widest hover:bg-yellow-300">
          Add Workout
        </button>
      </div>

      {/* Workout History */}
      <div className="bg-gray-800 rounded-xl p-5">
        <h2 className="text-white font-black uppercase tracking-wide mb-4">Workout History</h2>
        {workouts.length === 0 && (
          <p className="text-gray-500 text-center py-6">No workouts yet. Add one above!</p>
        )}
        {[...workouts].reverse().map(w => (
          <div key={w.id} className="border-b border-gray-700 py-3 flex justify-between items-center">
            <div>
              <p className="text-yellow-400 font-bold capitalize">{w.exercise}</p>
              <p className="text-gray-400 text-sm">{w.sets} sets · {w.reps} reps · {w.duration} mins · {w.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-orange-900 text-orange-400 font-bold px-3 py-1 rounded-full text-sm">
                {w.calories} kcal
              </span>
              <button onClick={() => deleteWorkout(w.id)}
                className="text-gray-500 hover:text-red-400 text-lg font-bold">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}