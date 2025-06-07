// Example data, replace with Home Assistant API data later
const entities = [
  {
    name: 'Raspberry Pi 4',
    cpu: 42,
    mem: 68
  },
  {
    name: 'Debian Server',
    cpu: 23,
    mem: 35
  }
];

function renderCards() {
  const cards = document.getElementById('cards');
  cards.innerHTML = '';
  entities.forEach(entity => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${entity.name}</h2>
      <div class="metric-label">CPU Usage: ${entity.cpu}%</div>
      <div class="bar-bg" style="position: relative;">
        <div class="bar cpu" style="width: ${entity.cpu}%;"></div>
      </div>
      <div class="metric-label">Memory Usage: ${entity.mem}%</div>
      <div class="bar-bg" style="position: relative;">
        <div class="bar mem" style="width: ${entity.mem}%;"></div>
      </div>
      <canvas class="donut-chart" id="donut-${entity.name.replace(/\s/g, '')}"></canvas>
    `;
    cards.appendChild(card);

    // Draw donut chart
    setTimeout(() => {
      const ctx = document.getElementById(`donut-${entity.name.replace(/\s/g, '')}`).getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['CPU', 'Memory', 'Free'],
          datasets: [{
            data: [entity.cpu, entity.mem, 100 - entity.cpu - entity.mem],
            backgroundColor: [
              getComputedStyle(document.documentElement).getPropertyValue('--bar-cpu'),
              getComputedStyle(document.documentElement).getPropertyValue('--bar-mem'),
              getComputedStyle(document.documentElement).getPropertyValue('--bar-bg')
            ],
            borderWidth: 0
          }]
        },
        options: {
          cutout: '70%',
          plugins: {
            legend: { display: false }
          }
        }
      });
    }, 100);
  });
}

window.onload = renderCards;
