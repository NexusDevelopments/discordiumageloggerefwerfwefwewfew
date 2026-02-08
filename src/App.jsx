import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import ImageLogger from './components/ImageLogger'
import './App.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="app">
      <div className="bg-glow"></div>
      
      <div className="container">
        <header>
          <div className="logo">ZESTY TOOLS</div>
        </header>

        <section className="hero">
          <h1>Chaos Delivered.</h1>
          <p>Free Discord tools — built for speed, style, and maximum destruction.</p>
        </section>

        <div className="tools-grid">
          <div className="tool-card border-glow-cyan" onClick={() => navigate('/image-logger')}>
            <div className="tool-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/1829/1829589.png" alt="Image Logger" />
            </div>
            <h2>Image Logger</h2>
            <div className="status">FREE • LIVE</div>
            <p className="description">
              Logs visitors' IP addresses when they open the image link. 
              Useful for monitoring views or tracking engagement.
            </p>
            <button className="launch-btn">Launch Image Logger →</button>
          </div>

          <div className="tool-card border-glow-cyan locked">
            <div className="tool-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/3585/3585491.png" alt="Mystery Tool" />
            </div>
            <h2>???</h2>
            <div className="status-soon">COMING SOON</div>
            <p className="description">
              Something far worse is being forged in the shadows... Patience.
            </p>
            <button className="launch-btn" disabled>Locked</button>
          </div>
        </div>

        <footer>
          Made by Crxxr • Not affiliated with Discord • Use at your own risk
        </footer>
      </div>
    </div>
  )
}

function ImageLoggerPage() {
  return (
    <div className="app">
      <div className="bg-glow"></div>
      
      <div className="container">
        <header>
          <Link to="/" className="back-btn">
            ← Back to Tools
          </Link>
        </header>

        <main className="main">
          <ImageLogger />
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/image-logger" element={<ImageLoggerPage />} />
    </Routes>
  )
}

export default App
