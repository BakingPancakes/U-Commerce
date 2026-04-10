import React from 'react'
import Navbar from '../Components/Navbar'
import './MainPage.css'

function MainPage() {
  return (
    <div className="main-page-container">
      <Navbar />
      <main>
        <header className="welcome-header">
          <h1>Welcome to Our Website!</h1>
        </header>
        <section className="content">
          <p>Hello there! We are glad you visited our site.</p>
          <p>Explore the content below and discover more about us.</p>
        </section>
      </main>
    </div>
  )
}

export default MainPage
