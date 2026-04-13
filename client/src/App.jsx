import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import ListingsPage from './Pages/ListingsPage'
import LoginPage from './Pages/LoginPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* You can add other routes here later */}
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
