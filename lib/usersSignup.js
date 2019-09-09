const url = 'http://localhost:5000/users/register';

function postUserInfo(e) {
  e.preventDefault();
  const form = document.getElementById('signup-form');
  const formData = new FormData(form);

  fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error =>
      console.error(`Can’t access ${url} response. Blocked by browser?`)
    );
}
