const url = 'http://localhost:5000/users/user';

function deleteUserInfo(e) {
  e.preventDefault();
  const form = document.getElementById('signup-form');
  const formData = new FormData(form);
  const values = [];
  for (const value of formData.values()) {
    values.push(value);
  }
  const tempVal = values[0];
  fetch(`${url}/${tempVal}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: tempVal }),
  })
    .then(response => {
      response.json();
    })
    .then(data => console.log('DATA', data))
    .catch(error =>
      console.error(`Can’t access ${url} response. Blocked by browser?`)
    );
}
