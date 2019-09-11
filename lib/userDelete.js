const url = 'http://localhost:5000/user/:id';

fetch(url, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userInfo),
})
  .then(response => {
    response.json();
  })
  .then(data => console.log('DATA', data))
  .catch(error =>
    console.error(`Can’t access ${url} response. Blocked by browser?`)
  );
