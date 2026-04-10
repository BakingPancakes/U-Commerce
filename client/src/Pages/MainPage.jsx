import React from 'react'
import Navbar from '../Components/Navbar'
import './MainPage.css'

function MainPage() {
  return (
    <div className="main-page-container">
      <Navbar />
      <main>
        {/* Slideshow Section */}
        <section className="slideshow-container">
          <div className="slide-image">
            <img src={require('../assets/hero.png')} alt="Slide 1" className="slide" />
          </div>
          <div className="slide-image">
            <img src={require('../assets/react.svg')} alt="Slide 2" className="slide" />
          </div>
          <div className="slide-image">
            <img src={require('../assets/vite.svg')} alt="Slide 3" className="slide" />
          </div>
        </section>

        {/* Welcome Header */}
        <header className="welcome-header">
          <h1>Welcome to U-Commerce</h1>
        </header>

        {/* About Section */}
        <section className="about-section">
          <h2>About Our Application</h2>
          <p>We are the central location for 5 college students to buy and sell goods and services.</p>
        </section>
      </main>
    </div>
  )
}

export default MainPage
