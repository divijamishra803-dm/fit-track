import { useState } from 'react'
import { saveBMI, getBMI } from '../utils/storage'

export default function BMI() {
  const [data, setData] = useState(getBMI())

  function calculate() {
    const h = Number(data.height) / 100
    const bmi = (Number(data.weight) / (h * h)).toFixed(1)
    const updated = { ...data, bmi }
    setData(updated)
    saveBMI(updated)
  }

  function getCategory(bmi) {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-400' }
    if (bmi < 25) return { label: 'Normal weight', color: 'text-green-400' }
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-400' }
    return { label: 'Obese', color: 'text-red-400' }
  }

  const cat = data.bmi ? getCategory(Number(data.bmi)) : null

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-black text-yellow-400 uppercase mb-6">BMI Tracker</h2>

      <div className="bg-gray-800 rounded-xl p-6 mb-4">
        <label className="text-gray-300 text-sm font-semibold block mb-1">Weight (kg)</label>
        <input type="number" placeholder="e.g. 70"
          className="w-full bg-gray-700 text-white rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-yellow-400"
          value={data.weight} onChange={e => setData({ ...data, weight: e.target.value })} />

        <label className="text-gray-300 text-sm font-semibold block mb-1">Height (cm)</label>
        <input type="number" placeholder="e.g. 175"
          className="w-full bg-gray-700 text-white rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-yellow-400"
          value={data.height} onChange={e => setData({ ...data, height: e.target.value })} />

        <button onClick={calculate}
          className="w-full bg-yellow-400 text-gray-900 font-black py-3 rounded-lg uppercase tracking-wide hover:bg-yellow-300">
          Calculate BMI
        </button>
      </div>

      {data.bmi && (
        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm mb-1">Your BMI</p>
          <p className="text-6xl font-black text-white mb-2">{data.bmi}</p>
          <p className={`text-xl font-bold ${cat.color}`}>{cat.label}</p>
          <div className="mt-4 grid grid-cols-4 gap-1 text-xs text-center">
            <div className="bg-blue-900 text-blue-300 rounded p-2">Under 18.5<br/>Underweight</div>
            <div className="bg-green-900 text-green-300 rounded p-2">18.5–24.9<br/>Normal</div>
            <div className="bg-yellow-900 text-yellow-300 rounded p-2">25–29.9<br/>Overweight</div>
            <div className="bg-red-900 text-red-300 rounded p-2">30+<br/>Obese</div>
          </div>
        </div>
      )}
    </div>
  )
}