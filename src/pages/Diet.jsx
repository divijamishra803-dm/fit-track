import { getProfile, getBMI } from '../utils/storage'

const dietPlans = {
  lose_weight: {
    title: 'Weight Loss Diet',
    calories: '1500–1800 kcal/day',
    color: 'text-orange-400',
    meals: [
      { time: 'Breakfast 8am', items: ['Oats with banana', 'Boiled eggs (2)', 'Green tea'], calories: 350 },
      { time: 'Mid Morning 11am', items: ['Apple or pear', 'Handful of almonds'], calories: 150 },
      { time: 'Lunch 1pm', items: ['Brown rice (1 cup)', 'Dal or lentils', 'Mixed vegetable sabzi', 'Curd'], calories: 450 },
      { time: 'Evening 4pm', items: ['Sprouts chaat', 'Buttermilk'], calories: 150 },
      { time: 'Dinner 7pm', items: ['2 rotis (wheat)', 'Grilled chicken or paneer', 'Salad'], calories: 400 },
    ],
    avoid: ['Fried foods', 'Sugary drinks', 'White bread', 'Processed snacks', 'Alcohol'],
    tips: ['Eat slowly and mindfully', 'Drink water 30 mins before meals', 'Never skip breakfast', 'Sleep 7-8 hours for better metabolism']
  },
  build_muscle: {
    title: 'Muscle Building Diet',
    calories: '2500–3000 kcal/day',
    color: 'text-yellow-400',
    meals: [
      { time: 'Breakfast 7am', items: ['5 egg whites + 2 whole eggs', 'Whole wheat toast', 'Banana', 'Milk'], calories: 600 },
      { time: 'Pre Workout 10am', items: ['Oats with honey', 'Protein shake', 'Banana'], calories: 400 },
      { time: 'Lunch 1pm', items: ['White rice (2 cups)', 'Chicken breast 200g', 'Dal', 'Vegetables'], calories: 700 },
      { time: 'Post Workout 4pm', items: ['Whey protein shake', 'Banana', 'Peanut butter toast'], calories: 450 },
      { time: 'Dinner 8pm', items: ['Roti (3)', 'Paneer or fish', 'Dal', 'Salad'], calories: 650 },
    ],
    avoid: ['Alcohol', 'Junk food', 'Skipping meals', 'Too much cardio', 'Insufficient sleep'],
    tips: ['Eat protein within 30 mins after workout', 'Aim for 1.6–2g protein per kg bodyweight', 'Stay hydrated — drink 3–4L water daily', 'Eat every 3–4 hours to keep muscles fuelled']
  },
  stay_fit: {
    title: 'Stay Fit Balanced Diet',
    calories: '2000–2200 kcal/day',
    color: 'text-green-400',
    meals: [
      { time: 'Breakfast 8am', items: ['Poha or upma', 'Boiled eggs (2)', 'Fruit juice'], calories: 400 },
      { time: 'Mid Morning 11am', items: ['Mixed fruits', 'Nuts'], calories: 200 },
      { time: 'Lunch 1pm', items: ['Rice or 2 rotis', 'Dal', 'Sabzi', 'Curd'], calories: 550 },
      { time: 'Evening 4pm', items: ['Roasted chana', 'Green tea or coconut water'], calories: 150 },
      { time: 'Dinner 7:30pm', items: ['2 rotis', 'Sabzi', 'Dal soup', 'Salad'], calories: 450 },
    ],
    avoid: ['Excess sugar', 'Packaged foods', 'Late night eating', 'Skipping meals'],
    tips: ['Eat rainbow coloured vegetables', 'Include all food groups in every meal', 'Limit screen time while eating', 'Stay consistent — 80% healthy, 20% flexible']
  },
  improve_endurance: {
    title: 'Endurance & Stamina Diet',
    calories: '2200–2500 kcal/day',
    color: 'text-blue-400',
    meals: [
      { time: 'Breakfast 7am', items: ['Oats with berries', 'Banana', 'Peanut butter toast', 'Milk'], calories: 550 },
      { time: 'Pre Run/Workout 10am', items: ['Banana', 'Energy bar or dates', 'Water'], calories: 250 },
      { time: 'Lunch 1pm', items: ['Brown rice (1.5 cups)', 'Chicken or tofu', 'Vegetables', 'Dal'], calories: 600 },
      { time: 'Evening 4pm', items: ['Sweet potato', 'Coconut water', 'Nuts'], calories: 250 },
      { time: 'Dinner 7pm', items: ['Pasta or rice', 'Lean protein', 'Steamed vegetables'], calories: 550 },
    ],
    avoid: ['Heavy meals before workout', 'Sugary sports drinks', 'Dehydration', 'Low carb diets'],
    tips: ['Carbs are your fuel — don\'t cut them', 'Eat 2 hours before long workouts', 'Replenish electrolytes after sweating', 'Include iron-rich foods like spinach and dal']
  }
}

export default function Diet() {
  const profile = getProfile()
  const goal = profile.goal || 'stay_fit'
  const plan = dietPlans[goal]

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-black text-yellow-400 uppercase mb-1">Diet Recommendations</h2>
      {profile.name && <p className="text-gray-400 text-sm mb-4">Personalised for <span className="text-yellow-400 font-bold">{profile.name.split(' ')[0]}</span> based on your goal</p>}

      {/* Goal card */}
      <div className="bg-gray-800 rounded-xl p-4 mb-4 flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-xs uppercase">Your Goal</p>
          <p className={`text-xl font-black ${plan.color}`}>{plan.title}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-xs uppercase">Daily Target</p>
          <p className="text-white font-bold text-sm">{plan.calories}</p>
        </div>
      </div>

      {!profile.goal && (
        <div className="bg-yellow-900 border border-yellow-500 rounded-xl p-3 mb-4 text-yellow-300 text-sm">
          💡 Set your fitness goal in the Profile page for a personalised diet plan!
        </div>
      )}

      {/* Meal plan */}
      <div className="bg-gray-800 rounded-xl p-5 mb-4">
        <h3 className="text-white font-black uppercase mb-4">Daily Meal Plan</h3>
        {plan.meals.map((meal, i) => (
          <div key={i} className="border-b border-gray-700 py-3 last:border-0">
            <div className="flex justify-between items-center mb-1">
              <p className={`font-bold text-sm ${plan.color}`}>{meal.time}</p>
              <span className="text-orange-400 text-xs font-bold bg-orange-900 px-2 py-0.5 rounded-full">
                ~{meal.calories} kcal
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {meal.items.map((item, j) => (
                <span key={j} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Avoid */}
      <div className="bg-gray-800 rounded-xl p-5 mb-4">
        <h3 className="text-red-400 font-black uppercase mb-3">❌ Foods to Avoid</h3>
        <div className="flex flex-wrap gap-2">
          {plan.avoid.map((item, i) => (
            <span key={i} className="bg-red-900 text-red-300 text-sm px-3 py-1 rounded-full">{item}</span>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-800 rounded-xl p-5">
        <h3 className="text-green-400 font-black uppercase mb-3">💡 Nutrition Tips</h3>
        {plan.tips.map((tip, i) => (
          <div key={i} className="flex gap-2 py-2 border-b border-gray-700 last:border-0">
            <span className="text-yellow-400">→</span>
            <p className="text-gray-300 text-sm">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  )
}