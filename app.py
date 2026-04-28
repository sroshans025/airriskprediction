from flask import Flask, render_template, jsonify
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import os

app = Flask(__name__)

# Train model globally so it only happens once per cold start
def prepare_forecast():
    base = os.path.dirname(__file__)
    csv_path = os.path.join(base, 'miami5yrs.csv')
    df = pd.read_csv(csv_path)
    
    # Process dates
    df['Date'] = pd.to_datetime(df['Date'], format='%d/%m/%Y', errors='coerce')
    df = df.dropna(subset=['Date'])
    df = df.sort_values('Date')
    
    # Extract AQI
    aqi_values = df['Overall AQI Value'].values
    
    # We will use last 7 days to predict the next day
    WINDOW = 7
    X = []
    y = []
    for i in range(len(aqi_values) - WINDOW):
        X.append(aqi_values[i:i+WINDOW])
        y.append(aqi_values[i+WINDOW])
        
    X = np.array(X)
    y = np.array(y)
    
    model = RandomForestRegressor(n_estimators=50, random_state=42)
    model.fit(X, y)
    
    # Predict next 7 days
    last_window = list(aqi_values[-WINDOW:])
    predictions = []
    
    for _ in range(7):
        pred = model.predict([last_window])[0]
        predictions.append(pred)
        last_window.append(pred)
        last_window.pop(0)
        
    last_30_dates = df['Date'].dt.strftime('%b %d').tolist()[-30:]
    last_30_aqi = aqi_values[-30:].tolist()
    
    # Future dates
    last_date = df['Date'].iloc[-1]
    future_dates = [(last_date + pd.Timedelta(days=i)).strftime('%b %d') for i in range(1, 8)]
    
    return {
        "historical": {
            "dates": last_30_dates,
            "aqi": last_30_aqi
        },
        "forecast": {
            "dates": future_dates,
            "aqi": [round(p, 1) for p in predictions]
        }
    }

# Cache the result to save time across requests
forecast_data = None

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/forecast')
def get_forecast():
    global forecast_data
    if forecast_data is None:
        try:
            forecast_data = prepare_forecast()
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    return jsonify(forecast_data)

if __name__ == '__main__':
    app.run(debug=True)
