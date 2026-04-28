async function init() {
    try {
        const response = await fetch('/api/forecast');
        const data = await response.json();
        
        if(data.error) {
            console.error("Server error:", data.error);
            document.getElementById('tomorrowStatus').innerText = "Error loading data";
            return;
        }

        // Update Tomorrow's Stats
        const tomorrowAqi = data.forecast.aqi[0];
        document.getElementById('tomorrowAqi').innerText = tomorrowAqi;
        
        const statusEl = document.getElementById('tomorrowStatus');
        if(tomorrowAqi <= 50) {
            statusEl.innerText = "Good";
            statusEl.style.color = "var(--good)";
            statusEl.style.background = "rgba(74, 222, 128, 0.1)";
            document.getElementById('tomorrowAqi').style.color = "var(--good)";
        } else if(tomorrowAqi <= 100) {
            statusEl.innerText = "Moderate";
            statusEl.style.color = "var(--moderate)";
            statusEl.style.background = "rgba(250, 204, 21, 0.1)";
            document.getElementById('tomorrowAqi').style.color = "var(--moderate)";
        } else {
            statusEl.innerText = "Unhealthy";
            statusEl.style.color = "var(--unhealthy)";
            statusEl.style.background = "rgba(248, 113, 113, 0.1)";
            document.getElementById('tomorrowAqi').style.color = "var(--unhealthy)";
        }

        // Render Chart
        const ctx = document.getElementById('aqiChart').getContext('2d');
        
        const labels = [...data.historical.dates.slice(-14), ...data.forecast.dates];
        const histData = [...data.historical.aqi.slice(-14), ...Array(7).fill(null)];
        const foreData = [...Array(13).fill(null), data.historical.aqi[data.historical.aqi.length - 1], ...data.forecast.aqi];
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Historical AQI',
                        data: histData,
                        borderColor: '#94a3b8',
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 2
                    },
                    {
                        label: 'Forecast AQI',
                        data: foreData,
                        borderColor: '#38bdf8',
                        backgroundColor: 'rgba(56, 189, 248, 0.2)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        borderDash: [5, 5],
                        pointRadius: 4,
                        pointBackgroundColor: '#0f172a'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#f8fafc', font: { family: 'Outfit' } } }
                },
                scales: {
                    y: { 
                        grid: { color: 'rgba(255,255,255,0.05)' }, 
                        ticks: { color: '#94a3b8', font: { family: 'Outfit' } },
                        beginAtZero: true
                    },
                    x: { 
                        grid: { display: false }, 
                        ticks: { color: '#94a3b8', maxTicksLimit: 10, font: { family: 'Outfit' } } 
                    }
                }
            }
        });

    } catch(e) {
        console.error("Error fetching forecast:", e);
        document.getElementById('tomorrowStatus').innerText = "Failed to fetch";
    }
}

init();
