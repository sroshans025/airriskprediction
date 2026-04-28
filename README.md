# 🌴 Air Predictor in Miami

A high-performance machine learning dashboard built to forecast tropical PM2.5 and overall Air Quality Index (AQI) fluctuations. It uses historical environmental data to generate a rolling 7-day radar prediction for coastal cities.

![UI Preview](https://img.shields.io/badge/UI-Miami_Synthwave-ff0844?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Flask-0f0c29?style=for-the-badge&logo=flask&logoColor=white)
![Scikit-Learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Vercel Ready](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white)

---

## ✨ Features

- **7-Day Forecasting:** Automatically processes up to 5 years of historical AQI data using a `RandomForestRegressor` to predict the exact Air Quality Index for the upcoming 7 days.
- **Dynamic Radar Charting:** Seamlessly integrates historical data with future predictions on a single, continuous interactive line graph using `Chart.js` with custom gradient tracking.
- **Miami Vice Aesthetic:** Features a heavily stylized, synthwave-inspired dark mode UI. Includes floating neon orbs, frosted glassmorphism, and vibrant pink/cyan gradient maps.
- **Animated Data Rendering:** Numbers and widgets dynamically count-up and transition states (e.g., Optimal, Moderate, Hazardous) based on the severity of the predicted PM2.5 concentrations.
- **Vercel Serverless Ready:** Pre-configured with `vercel.json` and optimized Python 3.12 dependencies (Scikit-learn, Pandas) to run instantly on Vercel Serverless infrastructure.

---

## 🛠️ Technology Stack

* **Backend Framework:** Flask (Python 3.12)
* **Machine Learning:** Scikit-Learn (`RandomForestRegressor`), Pandas, Numpy
* **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript, Chart.js
* **Deployment:** Vercel (Serverless Functions)

---

## 🚀 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/airriskprediction-main.git
cd airriskprediction-main
```

### 2. Create a Virtual Environment (Optional but recommended)
```bash
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Mac/Linux:
source .venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Start the Flask Server
```bash
python app.py
```

### 5. View Dashboard
Open your browser and navigate to: [http://localhost:5000](http://localhost:5000)

---

## ☁️ How to Deploy on Vercel

This application has been perfectly optimized for Vercel deployment. Heavy Deep Learning frameworks (like TensorFlow) were replaced with highly-efficient Scikit-Learn trees to ensure cold starts resolve in milliseconds.

1. Push your code to a GitHub repository.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New > Project**.
3. Import your repository.
4. Click **Deploy**. Vercel will use the provided `vercel.json` and `requirements.txt` to instantly build and deploy the application!
