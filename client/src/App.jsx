import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainPage from './Pages/MainPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* You can add other routes here later */}
      <Route path="/listings" element={<div>Listings Page</div>} />
      <Route path="/login" element={<div>Login Page</div>} />
    </Routes>
  )
}

export default App
