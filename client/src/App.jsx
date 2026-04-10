import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainPage from './Pages/MainPage'

function App() {

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
