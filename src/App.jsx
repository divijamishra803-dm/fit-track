import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Charts from './pages/Charts'
import BMI from './pages/BMI'
import Water from './pages/Water'
import Nutrition from './pages/Nutrition'
import Diet from './pages/Diet'
import Steps from './pages/Steps'
import Sleep from './pages/Sleep'
import Profile from './pages/Profile'

export default function App() {
  const [page, setPage] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar page={page} setPage={setPage} />
      {page === 'dashboard' && <Dashboard />}
      {page === 'charts' && <Charts />}
      {page === 'bmi' && <BMI />}
      {page === 'water' && <Water />}
      {page === 'nutrition' && <Nutrition />}
      {page === 'diet' && <Diet />}
      {page === 'steps' && <Steps />}
      {page === 'sleep' && <Sleep />}
      {page === 'profile' && <Profile />}
    </div>
  )
}