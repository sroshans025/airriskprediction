# 🏝️ Miami AQI: Coastal Air Quality Forecasting

### **Project Overview**
This project develops a robust Machine Learning pipeline to forecast $PM_{2.5}$ concentration levels in **Miami-Dade County**, specifically addressing the atmospheric dynamics of a tropical coastal environment. Unlike standard models for landlocked cities, this project emphasizes the "Sea Breeze Effect," where clean Atlantic air masses modulate urban pollutant concentrations. It demonstrates a full ML lifecycle, from domain-specific feature engineering to model evaluation.

### **The Dataset**
The model utilizes hourly data (2020–2024) merged from two primary sources:
* **EPA AirData:** $PM_{2.5}$ measurements from Miami-area monitoring stations (e.g., Kendall and Fire Station #5).
* **NOAA/NWS:** Meteorological features including Temperature, Relative Humidity, and Wind Vectors.

### **Technical Implementation**

#### **1. Miami-Specific Feature Engineering**
To capture the unique South Florida climate, the following features were engineered:
* **Sea-Breeze Indicator:** A binary feature based on wind direction ($45^\circ$–$135^\circ$ representing onshore Atlantic air).
* **Rain Washout Effect:** Rolling 3-hour precipitation sums to model how tropical storms "clean" the atmosphere.
* **Temporal Encoding:** Applied Sine/Cosine transformations to `Hour` and `Month` to preserve cyclical patterns.
* **Lag Features:** Included $t-1$ through $t-24$ hour lags to capture temporal autocorrelation.



#### **2. Model Architecture**
We evaluated three regressors using a **Time-Series Split** (Walk-Forward Validation) to prevent data leakage:
* **Baseline:** Linear Regression for trend identification.
* **Ensemble:** Random Forest for capturing non-linear interactions.
* **Boosting:** **XGBoost**, optimized via GridSearch hyperparameter tuning.



### **Results & Insights**
The **XGBoost model** achieved an **$R^2$ score of 0.86**, significantly outperforming the baseline. 
* **Feature Importance:** "Wind Direction" and "Lag-1 $PM_{2.5}$" were the strongest predictors. 
* **Discovery:** Onshore winds from the Atlantic consistently correlated with a 30% drop in $PM_{2.5}$ levels compared to stagnant inland conditions.
