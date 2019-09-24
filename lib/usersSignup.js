const url = 'http://localhost:5000/users';

function postUserInfo(e) {
  // prevent reloading
  e.preventDefault();
  const form = document.getElementById('signup-form');
  const formData = new FormData(form);
  const keys = [];
  const values = [];
  const reg = 'register';
  for (const value of formData.values()) {
    values.push(value);
  }

  for (const key of formData.keys()) {
    keys.push(key);
  }
  const userInfo = {};
  for (let i = 0; i < keys.length; i++) userInfo[keys[i]] = values[i];

  fetch(`${url}/${reg}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then(response => response.json())
    .then(text => console.log(text.id))
    .catch(err => console.log(err));
}

