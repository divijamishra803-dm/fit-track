import { useState } from 'react'
import { saveSteps, getSteps } from '../utils/storage'

const GOAL = 10000

export default function Steps() {
  const [steps, setSteps] = useState(getSteps())
  const [input, setInput] = useState('')

  function addSteps() {
    if (!input) return
    const updated = steps + Number(input)
    setSteps(updated)
    saveSteps(updated)
    setInput('')
  }

  function reset() { setSteps(0); saveSteps(0) }

  const percent = Math.min(Math.round((steps / GOAL) * 100), 100)
  const calories = Math.round(steps * 0.04)
  const km = (steps * 0.000762).toFixed(2)

  const circumference = 2 * Math.PI * 80
  const strokeDash = (percent / 100) * circumference

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-black text-yellow-400 uppercase mb-6">Step Counter</h2>

      {/* Circle Progress */}
      <div className="bg-gray-800 rounded-xl p-6 text-center mb-4">
        <div className="relative inline-flex items-center justify-center mb-4">
          <svg width="200" height="200" className="rotate-[-90deg]">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#374151" strokeWidth="12" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#facc15" strokeWidth="12"
              strokeDasharray={`${strokeDash} ${circumference}`}
              strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.5s ease' }} />
          </svg>
          <div className="absolute text-center">
            <p className="text-3xl font-black text-white">{steps.toLocaleString()}</p>
            <p className="text-gray-400 text-xs">of {GOAL.toLocaleString()}</p>
            <p className="text-yellow-400 font-bold">{percent}%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-orange-400 font-black text-xl">{calories}</p>
            <p className="text-gray-400 text-xs uppercase">Kcal</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-blue-400 font-black text-xl">{km} km</p>
            <p className="text-gray-400 text-xs uppercase">Distance</p>
          </div>
        </div>

        {steps >= GOAL && (
          <p className="text-green-400 font-black text-lg mb-3">🎉 Daily goal reached!</p>
        )}

        <div className="flex gap-2">
          <input className="flex-1 bg-gray-700 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Add steps" type="number" value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addSteps()} />
          <button onClick={addSteps}
            className="bg-yellow-400 text-gray-900 font-black px-5 rounded-lg hover:bg-yellow-300">
            Add
          </button>
          <button onClick={reset}
            className="bg-gray-700 text-gray-300 font-bold px-4 rounded-lg hover:bg-gray-600">
            Reset
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-white font-bold mb-3">Step Goals</h3>
        {[
          { steps: 5000, label: 'Lightly Active', color: 'bg-blue-500' },
          { steps: 7500, label: 'Moderately Active', color: 'bg-yellow-500' },
          { steps: 10000, label: 'Active', color: 'bg-green-500' },
          { steps: 12500, label: 'Highly Active', color: 'bg-orange-500' },
        ].map(tier => (
          <div key={tier.steps} className="flex items-center gap-3 py-2 border-b border-gray-700">
            <div className={`w-2 h-2 rounded-full ${steps >= tier.steps ? tier.color : 'bg-gray-600'}`} />
            <span className={`text-sm ${steps >= tier.steps ? 'text-white font-bold' : 'text-gray-500'}`}>
              {tier.steps.toLocaleString()} steps — {tier.label}
            </span>
            {steps >= tier.steps && <span className="ml-auto text-green-400 text-xs">✓</span>}
          </div>
        ))}
      </div>
    </div>
  )
}