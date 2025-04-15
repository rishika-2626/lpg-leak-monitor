async function fetchData() {
    const res = await fetch('/data');
    const data = await res.json();
  
    document.getElementById('count').textContent = data.length;
  
    // Group by day
    const dayCounts = {};
    data.forEach(ts => {
      const day = new Date(ts).toISOString().split('T')[0];
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
  
    const labels = Object.keys(dayCounts);
    const counts = Object.values(dayCounts);
  
    new Chart(document.getElementById('leakChart'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Leaks per Day',
          data: counts,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  
  fetchData();
  