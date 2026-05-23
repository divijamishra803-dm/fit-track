import { useState } from 'react'
import { getWater, saveWater } from '../utils/storage'

const GOAL = 8

export default function Water() {
  const [glasses, setGlasses] = useState(getWater())

  function add() {
    if (glasses >= GOAL) return
    const updated = glasses + 1
    setGlasses(updated)
    saveWater(updated)
  }

  function reset() {
    setGlasses(0)
    saveWater(0)
  }

  const percent = Math.round((glasses / GOAL) * 100)

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-black text-yellow-400 uppercase mb-6">Water Intake</h2>

      <div className="bg-gray-800 rounded-xl p-6 text-center mb-4">
        <p className="text-gray-400 text-sm mb-2">Today's goal: {GOAL} glasses</p>
        <p className="text-6xl font-black text-blue-400 mb-1">{glasses}</p>
        <p className="text-gray-400 text-sm mb-4">glasses drunk</p>

        <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
          <div className="bg-blue-400 h-4 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }} />
        </div>
        <p className="text-blue-300 font-bold mb-6">{percent}% of daily goal</p>

        <div className="flex gap-3 justify-center flex-wrap mb-4">
          {Array.from({ length: GOAL }).map((_, i) => (
            <span key={i} className={`text-3xl transition-all ${i < glasses ? 'opacity-100' : 'opacity-20'}`}>
              💧
            </span>
          ))}
        </div>

        {glasses >= GOAL && (
          <p className="text-green-400 font-bold text-lg mb-4">Goal reached! Amazing! 🎉</p>
        )}

        <div className="flex gap-3">
          <button onClick={add}
            className="flex-1 bg-blue-500 text-white font-black py-3 rounded-lg hover:bg-blue-400 uppercase">
            + Add Glass
          </button>
          <button onClick={reset}
            className="bg-gray-700 text-gray-300 font-bold px-4 py-3 rounded-lg hover:bg-gray-600">
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}