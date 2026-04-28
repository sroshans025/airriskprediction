async function init() {
    try {
        const response = await fetch('/api/forecast');
        const data = await response.json();
        
        if(data.error) {
            console.error("Server error:", data.error);
            document.getElementById('tomorrowStatus').innerText = "System Failure";
            return;
        }

        // Update Tomorrow's Stats
        const tomorrowAqi = data.forecast.aqi[0];
        
        // Add a counting animation
        const displayEl = document.getElementById('tomorrowAqi');
        let start = 0;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / tomorrowAqi));
        
        const timer = setInterval(() => {
            start += 1;
            displayEl.innerText = start;
            if(start >= Math.floor(tomorrowAqi)) {
                clearInterval(timer);
                displayEl.innerText = tomorrowAqi;
            }
        }, stepTime);
        
        const statusEl = document.getElementById('tomorrowStatus');
        
        if(tomorrowAqi <= 50) {
            statusEl.innerText = "Optimal Quality";
            statusEl.style.color = "#10b981"; // emerald
            statusEl.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
            statusEl.style.borderColor = "rgba(16, 185, 129, 0.3)";
            statusEl.style.boxShadow = "0 0 20px rgba(16, 185, 129, 0.2)";
        } else if(tomorrowAqi <= 100) {
            statusEl.innerText = "Moderate Levels";
            statusEl.style.color = "#f59e0b"; // amber
            statusEl.style.backgroundColor = "rgba(245, 158, 11, 0.1)";
            statusEl.style.borderColor = "rgba(245, 158, 11, 0.3)";
            statusEl.style.boxShadow = "0 0 20px rgba(245, 158, 11, 0.2)";
        } else {
            statusEl.innerText = "Hazardous Air";
            statusEl.style.color = "#ff0844"; // miami pink
            statusEl.style.backgroundColor = "rgba(255, 8, 68, 0.1)";
            statusEl.style.borderColor = "rgba(255, 8, 68, 0.3)";
            statusEl.style.boxShadow = "0 0 20px rgba(255, 8, 68, 0.2)";
        }

        // Render Chart
        const ctx = document.getElementById('aqiChart').getContext('2d');
        
        const labels = [...data.historical.dates.slice(-14), ...data.forecast.dates];
        const histData = [...data.historical.aqi.slice(-14), ...Array(7).fill(null)];
        const foreData = [...Array(13).fill(null), data.historical.aqi[data.historical.aqi.length - 1], ...data.forecast.aqi];
        
        // Gradients
        const histGradient = ctx.createLinearGradient(0, 0, 0, 400);
        histGradient.addColorStop(0, 'rgba(156, 163, 175, 0.2)');
        histGradient.addColorStop(1, 'rgba(156, 163, 175, 0)');

        const foreGradient = ctx.createLinearGradient(0, 0, 0, 400);
        foreGradient.addColorStop(0, 'rgba(0, 210, 255, 0.4)');
        foreGradient.addColorStop(1, 'rgba(0, 210, 255, 0)');

        Chart.defaults.font.family = 'Outfit';
        Chart.defaults.color = '#9ca3af';

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Historical AQI',
                        data: histData,
                        borderColor: '#9ca3af',
                        backgroundColor: histGradient,
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 2,
                        pointBackgroundColor: '#9ca3af'
                    },
                    {
                        label: 'Forecast AQI',
                        data: foreData,
                        borderColor: '#00d2ff', // miami cyan
                        backgroundColor: foreGradient,
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        borderDash: [5, 5],
                        pointRadius: 5,
                        pointBackgroundColor: '#0f0c29',
                        pointBorderColor: '#00d2ff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: '#00d2ff'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(15, 12, 41, 0.9)',
                        titleColor: '#00d2ff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(0, 210, 255, 0.3)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false
                    }
                },
                scales: {
                    y: { 
                        grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false }, 
                        ticks: { font: { weight: '600' } },
                        beginAtZero: true
                    },
                    x: { 
                        grid: { display: false }, 
                        ticks: { maxTicksLimit: 10 } 
                    }
                }
            }
        });

    } catch(e) {
        console.error("Error fetching forecast:", e);
        document.getElementById('tomorrowStatus').innerText = "Network Error";
    }
}

init();
