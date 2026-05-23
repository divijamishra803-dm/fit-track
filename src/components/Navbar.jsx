import { useState } from 'react'
import { getProfile } from '../utils/storage'

export default function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const profile = getProfile()

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏋️' },
    { id: 'charts', label: 'Progress', icon: '📈' },
    { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
    { id: 'diet', label: 'Diet Plan', icon: '🥦' },
    { id: 'bmi', label: 'BMI', icon: '⚖️' },
    { id: 'water', label: 'Water', icon: '💧' },
    { id: 'steps', label: 'Steps', icon: '👟' },
    { id: 'sleep', label: 'Sleep', icon: '😴' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ]

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-black tracking-widest text-yellow-400 uppercase">💪 FitTrack</h1>
        <div className="hidden md:flex gap-1 flex-wrap">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setPage(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                page === t.id ? 'bg-yellow-400 text-gray-900' : 'text-gray-300 hover:bg-gray-700'
              }`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <button className="md:hidden text-yellow-400 font-black text-xl"
          onClick={() => setMenuOpen(m => !m)}>☰</button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-3 grid grid-cols-3 gap-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => { setPage(t.id); setMenuOpen(false) }}
              className={`px-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                page === t.id ? 'bg-yellow-400 text-gray-900' : 'text-gray-300 bg-gray-800 hover:bg-gray-700'
              }`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}