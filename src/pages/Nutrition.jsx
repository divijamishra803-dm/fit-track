import { useState } from 'react'
import { getWorkouts } from '../utils/storage'

const foodCalories = {
  'rice': 206, 'chicken': 335, 'egg': 78, 'banana': 89,
  'apple': 95, 'bread': 79, 'milk': 149, 'oats': 154,
  'pasta': 220, 'salad': 20, 'burger': 540, 'pizza': 285,
  'dal': 180, 'roti': 104, 'paneer': 265, 'idli': 58,
  'dosa': 168, 'curd': 98, 'almonds': 164, 'protein shake': 130,
  'poha': 180, 'upma': 190, 'samosa': 260, 'chai': 50,
  'coffee': 15, 'orange': 62, 'mango': 99, 'watermelon': 30,
  'potato': 160, 'sweet potato': 130, 'sprouts': 90, 'tofu': 144
}

function estimateFoodCalories(food) {
  if (!food) return 0
  const key = food.toLowerCase().trim()
  const match = Object.keys(foodCalories).find(k => key.includes(k))
  return match ? foodCalories[match] : 150
}

export default function Nutrition() {
  const [meals, setMeals] = useState(() => {
    const data = localStorage.getItem('meals_' + new Date().toLocaleDateString())
    return data ? JSON.parse(data) : []
  })
  const [food, setFood] = useState('')
  const [qty, setQty] = useState('')
  const [preview, setPreview] = useState(0)

  const totalBurned = getWorkouts()
    .filter(w => w.date === new Date().toLocaleDateString())
    .reduce((sum, w) => sum + Number(w.calories || 0), 0)

  const totalIntake = meals.reduce((sum, m) => sum + m.calories, 0)
  const net = totalIntake - totalBurned

  function handleFoodChange(val) {
    setFood(val)
    setPreview(estimateFoodCalories(val) * (Number(qty) || 1))
  }

  function handleQtyChange(val) {
    setQty(val)
    setPreview(estimateFoodCalories(food) * (Number(val) || 1))
  }

  function addMeal() {
    if (!food) return
    const cal = estimateFoodCalories(food) * (Number(qty) || 1)
    const updated = [...meals, { id: Date.now(), food, qty: qty || 1, calories: Math.round(cal) }]
    setMeals(updated)
    localStorage.setItem('meals_' + new Date().toLocaleDateString(), JSON.stringify(updated))
    setFood('')
    setQty('')
    setPreview(0)
  }

  function deleteMeal(id) {
    const updated = meals.filter(m => m.id !== id)
    setMeals(updated)
    localStorage.setItem('meals_' + new Date().toLocaleDateString(), JSON.stringify(updated))
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-black text-yellow-400 uppercase mb-6">Calorie Balance</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <p className="text-green-400 text-2xl font-black">{totalIntake}</p>
          <p className="text-gray-400 text-xs uppercase mt-1">Kcal In</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <p className="text-orange-400 text-2xl font-black">{totalBurned}</p>
          <p className="text-gray-400 text-xs uppercase mt-1">Kcal Burned</p>
        </div>
        <div className={`rounded-xl p-4 text-center ${net > 0 ? 'bg-red-900' : 'bg-green-900'}`}>
          <p className={`text-2xl font-black ${net > 0 ? 'text-red-400' : 'text-green-400'}`}>
            {net > 0 ? '+' : ''}{net}
          </p>
          <p className="text-gray-400 text-xs uppercase mt-1">Net Kcal</p>
        </div>
      </div>

      {/* Status message */}
      <div className={`rounded-xl p-3 mb-6 text-center font-bold text-sm ${
        net > 300 ? 'bg-red-900 text-red-300' :
        net < -300 ? 'bg-blue-900 text-blue-300' :
        'bg-green-900 text-green-300'
      }`}>
        {net > 300 ? '⚠️ Calorie surplus — consider more exercise or less food' :
         net < -300 ? '⚠️ Calorie deficit — make sure you are eating enough' :
         totalIntake === 0 ? '🍽️ Start logging your meals below' :
         '✅ Great balance! You are within a healthy range today'}
      </div>

      {/* Add Meal */}
      <div className="bg-gray-800 rounded-xl p-5 mb-6">
        <h3 className="text-white font-black uppercase mb-4">Log a Meal</h3>
        <input
          className="w-full bg-gray-700 text-white rounded-lg p-3 mb-3 outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Food name (e.g. rice, chicken, banana, roti)"
          value={food} onChange={e => handleFoodChange(e.target.value)} />
        <input
          className="w-full bg-gray-700 text-white rounded-lg p-3 mb-3 outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Quantity / servings (default 1)"
          type="number" value={qty} onChange={e => handleQtyChange(e.target.value)} />

        {preview > 0 && (
          <div className="bg-green-900 border border-green-500 rounded-lg p-3 mb-3 text-center">
            <p className="text-green-300 text-xs uppercase">Estimated calories</p>
            <p className="text-green-400 text-2xl font-black">{Math.round(preview)} kcal</p>
          </div>
        )}

        <button onClick={addMeal}
          className="w-full bg-yellow-400 text-gray-900 font-black py-3 rounded-lg uppercase tracking-widest hover:bg-yellow-300">
          Add Meal
        </button>
      </div>

      {/* Meal History */}
      <div className="bg-gray-800 rounded-xl p-5">
        <h3 className="text-white font-black uppercase mb-4">Today's Meals</h3>
        {meals.length === 0 && (
          <p className="text-gray-500 text-center py-6">No meals logged yet. Add one above!</p>
        )}
        {meals.map(m => (
          <div key={m.id} className="border-b border-gray-700 py-3 flex justify-between items-center">
            <div>
              <p className="text-white font-bold capitalize">{m.food}</p>
              <p className="text-gray-400 text-sm">Qty: {m.qty}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-900 text-green-400 font-bold px-3 py-1 rounded-full text-sm">
                {m.calories} kcal
              </span>
              <button onClick={() => deleteMeal(m.id)}
                className="text-gray-500 hover:text-red-400 text-lg font-bold">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}