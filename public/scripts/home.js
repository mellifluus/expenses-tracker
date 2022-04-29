//REQUEST EXPENSES

const selectYear = document.querySelector('#year');
const selectMonth = document.querySelector('#month');

const toggleSelects = () => {
  if (
    !selectYear.hasAttribute('disabled') &&
    !selectMonth.hasAttribute('disabled')
  ) {
    selectYear.setAttribute('disabled', '');
    selectMonth.setAttribute('disabled', '');
  } else {
    selectYear.removeAttribute('disabled');
    selectMonth.removeAttribute('disabled');
  }
};

const getExpenses = async () => {
  toggleSelects();

  fetch('/expense/get', {
    method: 'POST',
    body: new URLSearchParams({
      year: selectYear.value || undefined,
      month: selectMonth.value || undefined,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error('Something went wrong with the request');
    })
    .then((data) => updateChart(data))
    .catch((err) => console.error(err));
};

// CHART

const arrDaysInMonth = () =>
  [
    ...Array(
      new Date(selectYear.value, selectMonth.value, 0).getDate() + 1
    ).keys(),
  ].slice(1);

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const updateChart = (expenses) => {
  if (expenses.length) {
    if (selectMonth.value === '13') {
      chart.data.labels = months;

      (data = []).length = 12;
      data.fill(0);

      expenses.forEach((expense) => {
        data[Number(expense.date.split('-')[1]) - 1] += Number(expense.amount);
      });
      chart.data.datasets[0].data = data;
    } else {
      chart.data.labels = arrDaysInMonth();

      (data = []).length = chart.data.labels.length;
      data.fill(0);

      expenses.forEach((expense) => {
        data[Number(expense.date.split('-')[2]) - 1] += Number(expense.amount);
      });
      chart.data.datasets[0].data = data;
    }
  }
  chart.update();
  toggleSelects();
};

const chart = new Chart(document.querySelector('#chart'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: false,
      tooltip: {
        displayColors: false,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
        ticks: {
          display: false,
        },
      },
    },
  },
});
