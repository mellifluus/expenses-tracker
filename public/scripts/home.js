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
      if (res.status !== 200) {
        throw new Error('Something went wrong with the request.');
      }
      return res.json();
    })
    .then((data) => {
      //data is an array of expenses, do stuff with them
    })
    .catch((err) => console.error(err))
    .finally(() => toggleSelects());
};

const chart = (document.querySelector('#chart'), {});
