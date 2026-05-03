import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainPage from './Pages/MainPage'
import ListingsPage from './Pages/ListingsPage'
import LoginPage from './Pages/LoginPage'
import ListingDetailPage from './Pages/ListingDetailPage'
import ListingFormPage from './Pages/ListingFormPage'
import ProfilePage from './Pages/ProfilePage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* You can add other routes here later */}
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/listings/new" element={<ListingFormPage mode="create" />} />
      <Route path="/listings/:id" element={<ListingDetailPage />} />
      <Route path="/listings/:id/edit" element={<ListingFormPage mode="edit" />} />
    </Routes>
  )
}

export default App
