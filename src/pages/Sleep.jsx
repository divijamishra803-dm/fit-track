import { useState } from 'react'
import { saveSleep, getSleep, getProfile } from '../utils/storage'

const qualities = [
  { id: 'great', label: 'Great 😴', color: 'bg-green-500' },
  { id: 'good', label: 'Good 🙂', color: 'bg-yellow-500' },
  { id: 'okay', label: 'Okay 😐', color: 'bg-orange-500' },
  { id: 'bad', label: 'Bad 😫', color: 'bg-red-500' },
]

const tips = {
  great: ['Keep your consistent sleep schedule!', 'Great sleep boosts muscle recovery', 'You are well rested for today\'s workout!'],
  good: ['Try to sleep 30 mins earlier tonight', 'Avoid screens 1 hour before bed', 'Stay hydrated throughout the day'],
  okay: ['Aim for 7-9 hours of sleep', 'Try meditation before bed', 'Avoid caffeine after 3pm'],
  bad: ['Poor sleep hurts workout performance', 'Try a consistent bedtime routine', 'Keep your room dark and cool'],
}

export default function Sleep() {
  const [sleep, setSleep] = useState(getSleep())
  const [saved, setSaved] = useState(false)
  const profile = getProfile()

  function handleSave() {
    saveSleep(sleep)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const hours = Number(sleep.hours) || 0
  const status = hours >= 8 ? 'Excellent' : hours >= 7 ? 'Good' : hours >= 6 ? 'Fair' : hours > 0 ? 'Poor' : null
  const statusColor = hours >= 8 ? 'text-green-400' : hours >= 7 ? 'text-yellow-400' : hours >= 6 ? 'text-orange-400' : 'text-red-400'

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-black text-yellow-400 uppercase mb-2">Sleep Tracker</h2>
      {profile.name && <p className="text-gray-400 text-sm mb-6">Good morning, <span className="text-yellow-400 font-bold">{profile.name.split(' ')[0]}</span>! How did you sleep?</p>}

      {/* Sleep input */}
      <div className="bg-gray-800 rounded-xl p-5 mb-4">
        <label className="text-gray-400 text-xs uppercase block mb-2">Hours slept last night</label>
        <input className="w-full bg-gray-700 text-white rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-yellow-400 text-2xl font-black text-center"
          type="number" placeholder="e.g. 7.5" min="0" max="24" step="0.5"
          value={sleep.hours} onChange={e => setSleep({ ...sleep, hours: e.target.value })} />

        {status && (
          <div className="text-center mb-4">
            <p className={`text-3xl font-black ${statusColor}`}>{status}</p>
            <p className="text-gray-400 text-sm">{hours} hours of sleep</p>
          </div>
        )}

        {/* Sleep bar */}
        {hours > 0 && (
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
            <div className={`h-3 rounded-full transition-all duration-500 ${
              hours >= 8 ? 'bg-green-400' : hours >= 7 ? 'bg-yellow-400' : hours >= 6 ? 'bg-orange-400' : 'bg-red-400'
            }`} style={{ width: `${Math.min((hours / 10) * 100, 100)}%` }} />
          </div>
        )}

        <label className="text-gray-400 text-xs uppercase block mb-2">Sleep quality</label>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {qualities.map(q => (
            <button key={q.id} onClick={() => setSleep({ ...sleep, quality: q.id })}
              className={`p-3 rounded-lg font-bold text-sm transition-all ${
                sleep.quality === q.id ? q.color + ' text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}>
              {q.label}
            </button>
          ))}
        </div>

        <button onClick={handleSave}
          className="w-full bg-yellow-400 text-gray-900 font-black py-3 rounded-lg uppercase tracking-widest hover:bg-yellow-300">
          {saved ? '✅ Saved!' : 'Save Sleep Log'}
        </button>
      </div>

      {/* Tips */}
      {sleep.quality && (
        <div className="bg-gray-800 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">💡 Sleep Tips For You</h3>
          {tips[sleep.quality].map((tip, i) => (
            <div key={i} className="flex gap-2 py-2 border-b border-gray-700 last:border-0">
              <span className="text-yellow-400 mt-0.5">→</span>
              <p className="text-gray-300 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}