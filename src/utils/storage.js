export function saveWorkout(workout) {
  const existing = getWorkouts()
  existing.push({ ...workout, id: Date.now(), date: new Date().toLocaleDateString() })
  localStorage.setItem('workouts', JSON.stringify(existing))
}
export function getWorkouts() {
  const data = localStorage.getItem('workouts')
  return data ? JSON.parse(data) : []
}
export function saveBMI(data) { localStorage.setItem('bmi', JSON.stringify(data)) }
export function getBMI() {
  const data = localStorage.getItem('bmi')
  return data ? JSON.parse(data) : { weight: '', height: '', bmi: null }
}
export function getWater() {
  const data = localStorage.getItem('water_' + new Date().toLocaleDateString())
  return data ? JSON.parse(data) : 0
}
export function saveWater(glasses) {
  localStorage.setItem('water_' + new Date().toLocaleDateString(), JSON.stringify(glasses))
}
export function getStreak() {
  const workouts = getWorkouts()
  if (workouts.length === 0) return 0
  const dates = [...new Set(workouts.map(w => w.date))].sort((a, b) => new Date(b) - new Date(a))
  let streak = 1
  for (let i = 0; i < dates.length - 1; i++) {
    const diff = (new Date(dates[i]) - new Date(dates[i + 1])) / (1000 * 60 * 60 * 24)
    if (diff === 1) streak++
    else break
  }
  return streak
}
export function saveProfile(data) { localStorage.setItem('profile', JSON.stringify(data)) }
export function getProfile() {
  const data = localStorage.getItem('profile')
  return data ? JSON.parse(data) : { name: '', age: '', weight: '', height: '', goal: 'lose_weight' }
}
export function saveSteps(steps) {
  localStorage.setItem('steps_' + new Date().toLocaleDateString(), JSON.stringify(steps))
}
export function getSteps() {
  const data = localStorage.getItem('steps_' + new Date().toLocaleDateString())
  return data ? JSON.parse(data) : 0
}
export function saveSleep(data) {
  localStorage.setItem('sleep_' + new Date().toLocaleDateString(), JSON.stringify(data))
}
export function getSleep() {
  const data = localStorage.getItem('sleep_' + new Date().toLocaleDateString())
  return data ? JSON.parse(data) : { hours: '', quality: '' }
}