const url = 'http://localhost:5000/users/register';

function postUserInfo(e) {
  e.preventDefault();
  const formData = new FormData();

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(formData),
  })
    .then(response => console.log(formData).response.json())
    .then(data => console.log(data))
    .catch(error =>
      console.error(`Can’t access ${url} response. Blocked by browser?`)
    );
}
