const getExpenses = (param) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/test', true); // change endpoint
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(xhr.responseText);
      // apply data to chart
    }
  };
};

const chart = (document.querySelector('#chart'), {});
