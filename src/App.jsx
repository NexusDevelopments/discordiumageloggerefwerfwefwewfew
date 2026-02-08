import React, { useState } from 'react'
import ImageLogger from './components/ImageLogger'
import './App.css'

function App() {
  const [activeTool, setActiveTool] = useState(null)

  if (activeTool === 'image-logger') {
    return (
      <div className="app">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        
        <header className="header-small">
          <button className="back-btn" onClick={() => setActiveTool(null)}>
            ← Back to Tools
          </button>
        </header>

        <main className="main">
          <ImageLogger />
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      
      <header className="header">
        <h1 className="title glow-cyan">ZESTY TOOLS</h1>
        <p className="subtitle">Premium Discord Utilities</p>
      </header>

      <main className="main">
        <div className="tools-grid">
          <div className="tool-card border-glow-cyan">
            <div className="tool-icon">📸</div>
            <h2 className="tool-title">Image Logger</h2>
            <div className="tool-badge">FREE • LIVE</div>
            <p className="tool-description">
              Logs visitors' IP addresses when they open the image link. 
              Useful for monitoring views or tracking engagement.
            </p>
            <button className="tool-launch-btn" onClick={() => setActiveTool('image-logger')}>
              Launch Image Logger →
            </button>
          </div>

          <div className="tool-card border-glow-cyan opacity-50">
            <div className="tool-icon">💬</div>
            <h2 className="tool-title">Webhook Spammer</h2>
            <div className="tool-badge-soon">COMING SOON</div>
            <p className="tool-description">
              Mass spam • Auto-delete • Multi-webhook • Random troll names & avatars • 
              Pure server destruction.
            </p>
            <button className="tool-launch-btn locked" disabled>
              Locked
            </button>
          </div>

          <div className="tool-card border-glow-cyan opacity-50">
            <div className="tool-icon">✨</div>
            <h2 className="tool-title">Vouch Bot</h2>
            <div className="tool-badge-soon">COMING SOON</div>
            <p className="tool-description">
              Auto-vouch collection • Reaction system • Channel logs • 
              Marketplace/trading ready • Keep reputation loud and clean.
            </p>
            <button className="tool-launch-btn locked" disabled>
              Locked
            </button>
          </div>

          <div className="tool-card border-glow-cyan opacity-50">
            <div className="tool-icon">💀</div>
            <h2 className="tool-title">???</h2>
            <div className="tool-badge-soon">COMING SOON</div>
            <p className="tool-description">
              Something far worse is being forged in the shadows... Patience.
            </p>
            <button className="tool-launch-btn locked" disabled>
              Locked
            </button>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Made with <span className="glow-cyan">❤</span> for Discord</p>
      </footer>
    </div>
  )
}

export default App
