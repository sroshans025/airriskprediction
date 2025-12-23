# 🏝️ Miami AQI: Coastal Air Quality Forecasting
**A Machine Learning Approach to Predicting $PM_{2.5}$ in Tropical Environments**

## 📌 Project Overview
This project focuses on predicting fine particulate matter ($PM_{2.5}$) levels across **Miami-Dade County**. Unlike landlocked cities, Miami's air quality is heavily influenced by the Atlantic "Sea Breeze" effect, high tropical humidity, and seasonal rainfall patterns.

The goal is to build a robust regression model that forecasts air quality 1 to 6 hours in advance, providing a predictive tool for public health awareness in South Florida.

---

## 📊 The Dataset
The data is synthesized from two primary sources:
* **Environmental Protection Agency (EPA):** Hourly $PM_{2.5}$ concentrations from monitoring stations in Miami (e.g., Kendall and Fire Station #5).
* **NOAA/NWS:** Meteorological data including Temperature, Relative Humidity, Wind Speed, and Wind Direction.

---

## 🛠️ Machine Learning Pipeline

### 1. Feature Engineering (Miami-Specific)
To capture the unique climate of South Florida, the following features were engineered:
* **Sea Breeze Indicator:** A binary feature identifying "Onshore" (clean Atlantic air) vs. "Offshore" (inland/urban air) wind directions.
* **Lag Features:** $PM_{2.5}$ values from $t-1$, $t-3$, and $t-24$ hours to capture temporal autocorrelation.
* **Cyclical Encoding:** Transformation of `Hour` and `Month` into Sine/Cosine coordinates to preserve periodic relationships.
* **Rain Washout:** A rolling 3-hour precipitation sum to account for the "cleansing" effect of Miami's afternoon thunderstorms.

### 2. Models Evaluated
I compared three distinct modeling approaches:
* **Baseline:** Linear Regression (to establish a performance floor).
* **Tree-Based:** Random Forest Regressor (to handle non-linear interactions).
* **Gradient Boosting:** **XGBoost** (Optimized via RandomSearchCV for highest accuracy).

### 3. Validation Strategy
Since this is time-series data, I utilized a **Walk-Forward Validation** (TimeSeriesSplit) strategy to prevent data leakage and ensure the model generalizes to future events.

---

## 📈 Performance Summary
| Model | MAE (μg/m³) | RMSE | $R^2$ Score |
| :--- | :--- | :--- | :--- |
| Linear Regression | 4.21 | 6.10 | 0.58 |
| **XGBoost (Final)** | **2.15** | **3.42** | **0.86** |

---

## 📁 Repository Structure
```text
├── data/               # Raw and cleaned CSV files
├── notebooks/          # EDA and Model Training (Jupyter)
└── README.md           # Project documentation
