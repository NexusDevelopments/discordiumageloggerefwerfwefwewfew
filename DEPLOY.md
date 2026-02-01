# Webhook Monitor - Vercel Deployment Guide

## Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Framework: Other
   - Root Directory: ./
   - Deploy!

3. **Your App Will Be At:**
   - `https://your-project.vercel.app`
   - Image link: `https://your-project.vercel.app/image.php?id=xxxxx`
   - Monitor: `https://your-project.vercel.app/monitor.php?i=xxxxx`

## Local Development

```bash
python -m pip install -r requirements.txt
python app.py
```

Visit `http://localhost:5000`
