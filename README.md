# 🪔 Sanskriti AI — Bharat Cultural Repository

> Preserving India's Soul Through Artificial Intelligence

**Live Demo:** https://sanskriti-temp.vercel.app

---

## 🌟 What is Sanskriti AI?

Sanskriti AI is a digital cultural ecosystem that preserves and promotes India's rich heritage through AI-powered tools. It connects students with master artisans, enables cultural storytelling, and makes India's traditions accessible to the world.

---

## ✨ Key Features

- 🗺️ **Heritage Explorer** — Discover all 28 states with cultural details, dance forms, textiles, and art
- 👨‍🎨 **Mentor Network** — Connect with 40+ verified master artisans across India
- 🤖 **AI Chatbot** — Gemini-powered guide for Indian culture and marketplace
- 📖 **Folklore Universe** — AI-assisted storytelling platform for Indian legends
- 🛒 **Craft Marketplace** — Authentic handcrafted products directly from artisans
- 🎯 **Heritage Roadmap** — Personal journey tracker for cultural exploration
- 🎬 **Video Vault** — Cultural tutorials and performances
- 🔐 **Role-based Auth** — Explorer and Artisan/Mentor flows with Google Sign-In

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4, Framer Motion |
| Backend | Firebase (Auth + Firestore) |
| AI | Google Gemini API |
| Deployment | Vercel |

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+
- A Firebase project
- A Gemini API key

### Steps

```bash
# Clone the repo
git clone https://github.com/c0mbateRxd/sanskriti-temp.git
cd sanskriti-temp

# Install dependencies
npm install --legacy-peer-deps

# Add environment variable
# Create .env.local and add:
# GEMINI_API_KEY=your_key_here

# Run locally
npm run dev
```

Open `http://localhost:3000`

---

## 🔥 Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Google Authentication**
3. Enable **Firestore Database** (test mode)
4. Copy your config into `firebase-applet-config.json`
5. Go to `/mentor-dashboard` → click **Sync Cloud Data** to seed artists

---

## 📁 Project Structure
