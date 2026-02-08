import React, { useState } from 'react'
import ImageLogger from './components/ImageLogger'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      
      <header className="header">
        <h1 className="title glow-red">DISCORD TOOLS</h1>
        <p className="subtitle">Premium Image Logger Generator</p>
      </header>

      <main className="main">
        <ImageLogger />
      </main>

      <footer className="footer">
        <p>Made with <span className="glow-red">❤</span> for Discord</p>
      </footer>
    </div>
  )
}

export default App
