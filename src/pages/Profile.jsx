import { useState } from 'react'
import { saveProfile, getProfile } from '../utils/storage'

const goals = [
  { id: 'lose_weight', label: 'Lose Weight', icon: '🔥' },
  { id: 'build_muscle', label: 'Build Muscle', icon: '💪' },
  { id: 'stay_fit', label: 'Stay Fit', icon: '⚡' },
  { id: 'improve_endurance', label: 'Improve Endurance', icon: '🏃' },
]

export default function Profile() {
  const [profile, setProfile] = useState(getProfile())
  const [saved, setSaved] = useState(false)

  function handleSave() {
    saveProfile(profile)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const bmi = profile.weight && profile.height
    ? (Number(profile.weight) / Math.pow(Number(profile.height) / 100, 2)).toFixed(1)
    : null

  function getBMICategory(bmi) {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-400' }
    if (bmi < 25) return { label: 'Normal', color: 'text-green-400' }
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-400' }
    return { label: 'Obese', color: 'text-red-400' }
  }

  const cat = bmi ? getBMICategory(Number(bmi)) : null

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-black text-yellow-400 uppercase mb-6">My Profile</h2>

      {/* Avatar */}
      <div className="bg-gray-800 rounded-xl p-6 text-center mb-4">
        <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-4xl mx-auto mb-3">
          {profile.name ? profile.name[0].toUpperCase() : '👤'}
        </div>
        <p className="text-white text-xl font-black">{profile.name || 'Your Name'}</p>
        <p className="text-gray-400 text-sm">{profile.age ? `${profile.age} years old` : 'Age not set'}</p>
        {bmi && <p className={`text-sm font-bold mt-1 ${cat.color}`}>BMI: {bmi} — {cat.label}</p>}
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-xl p-5 mb-4">
        <h3 className="text-white font-black uppercase mb-4">Personal Info</h3>

        <label className="text-gray-400 text-xs uppercase block mb-1">Full Name</label>
        <input className="w-full bg-gray-700 text-white rounded-lg p-3 mb-3 outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="e.g. Divija Mishra"
          value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div>
            <label className="text-gray-400 text-xs uppercase block mb-1">Age</label>
            <input className="w-full bg-gray-700 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="e.g. 21" type="number"
              value={profile.age} onChange={e => setProfile({ ...profile, age: e.target.value })} />
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase block mb-1">Weight kg</label>
            <input className="w-full bg-gray-700 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="e.g. 60" type="number"
              value={profile.weight} onChange={e => setProfile({ ...profile, weight: e.target.value })} />
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase block mb-1">Height cm</label>
            <input className="w-full bg-gray-700 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="e.g. 165" type="number"
              value={profile.height} onChange={e => setProfile({ ...profile, height: e.target.value })} />
          </div>
        </div>

        <label className="text-gray-400 text-xs uppercase block mb-2">Fitness Goal</label>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {goals.map(g => (
            <button key={g.id} onClick={() => setProfile({ ...profile, goal: g.id })}
              className={`p-3 rounded-lg font-bold text-sm transition-all ${
                profile.goal === g.id
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}>
              {g.icon} {g.label}
            </button>
          ))}
        </div>

        <button onClick={handleSave}
          className="w-full bg-yellow-400 text-gray-900 font-black py-3 rounded-lg uppercase tracking-widest hover:bg-yellow-300">
          {saved ? '✅ Saved!' : 'Save Profile'}
        </button>
      </div>
    </div>
  )
}