# 🌍 Voyaige - AI-Powered Trip Planner

![Screenshot](public/banner.png)

Voyaige is an intelligent travel planning application that leverages AI to create personalized itineraries based on your preferences, budget, and travel style.

---

## ✨ Features

### 🧠 AI-Powered Itinerary Generation
- **Personalized trip plans** based on destination, duration, and traveler type
- **Smart budget allocation** across accommodations, activities, and dining
- **Seasonal recommendations** tailored to your travel dates

### 🗺️ Interactive Trip Dashboard
- **Day-by-day itinerary** with maps and time allocations
- **Place details** with photos, ratings, and pricing information
- **Drag-and-drop** itinerary customization

---

## 🔥 Tech Stack

**Frontend:**
- ⚡ [Vite](https://vitejs.dev/) - Next-gen frontend tooling
- ⚛️ [React](https://react.dev/) - JavaScript library for building UIs
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- ✨ [Shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- 🗺️ [Google Maps API](https://developers.google.com/maps) - Maps and places integration

**Backend & AI:**
- 🔥 [Firebase](https://firebase.google.com/) - Authentication and database
- 🤖 [OpenAI API](https://openai.com/) - AI itinerary generation
- 📡 [Places API](https://developers.google.com/maps/documentation/places/web-service) - Location data

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended) or yarn
- Firebase project with Authentication and Firestore enabled
- Google Cloud API keys (Maps, Places)
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/voyaige.git
   cd voyaige
   
2. Install Dependencies :
  npm install
  # or
  yarn install

3. Create a .env file in the root directory with your API keys:
  VITE_FIREBASE_API_KEY=your_firebase_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
  VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_id
  VITE_FIREBASE_APP_ID=your_firebase_app_id
  VITE_GOOGLE_API_KEY=your_google_maps_api_key
  VITE_OPENAI_API_KEY=your_openai_api_key

4. Run the development server:
   npm run dev
   # or
   yarn dev



