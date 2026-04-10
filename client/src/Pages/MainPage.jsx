import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import './MainPage.css'
import hampcollpic from "../assets/hamp-camp-pic.jpg"
import umasspic from "../assets/hamp-camp-pic.jpg"
import holyokepic from "../assets/hamp-camp-pic.jpg"
import smithpic from "../assets/hamp-camp-pic.jpg"
import amcolpic from "../assets/hamp-camp-pic.jpg"

function MainPage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex + 1) % 5)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const slides = [
    hampcollpic,
    umasspic,
    smithpic,
    holyokepic,
    amcolpic
  ]

  return (
    <div className="main-page-container">
      <Navbar />
      <main>
        {/* Slideshow Section */}
        <section className="slideshow-container">
          {slides.map((src, index) => (
            <div key={index} className="slide-image">
              <img src={src} alt={`Slide ${index + 1}`} className="slide" />
            </div>
          ))}
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
