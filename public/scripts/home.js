const getExpenses = (param) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/test', true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      console.log(xhr.responseText);
    }
  };
};
