const data = [];
let prev = Math.random() * 100;

for (let i = 0; i < 200; i++) {
  prev += 5 - Math.random() * 10;
  data.push({ x: i, y: prev });
}

const totalDuration = 5000;
const delayBetweenPoints = totalDuration / data.length;
const previousY = (ctx) =>
  ctx.index === 0
    ? ctx.chart.scales.y.getPixelForValue(100)
    : ctx.chart
        .getDatasetMeta(ctx.datasetIndex)
        .data[ctx.index - 1].getProps(['y'], true).y;

const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    },
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    },
  },
};

const config = {
  type: 'line',
  data: {
    datasets: [
      {
        data: data,
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        radius: 0,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: animation,
    interaction: {
      intersect: false,
    },
    hover: { mode: null },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: false,
    },
    scales: {
      x: {
        type: 'linear',
        ticks: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
      },
    },
  },
};

const canv = document.querySelector('#landing-chart');
Chart.defaults.plugins.legend.display = false;
const landingChart = new Chart(canv, config);
