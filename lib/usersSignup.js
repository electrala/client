// const url = 'http://localhost:5000/users';

// function postUserInfo(e) {
//   e.preventDefault();
//   const form = document.getElementById('signup-form');
//   const formData = new FormData(form);
//   const keys = [];
//   const values = [];
//   const reg = 'register';
//   for (const value of formData.values()) {
//     values.push(value);
//   }

//   for (const key of formData.keys()) {
//     keys.push(key);
//   }

//   const userInfo = {};
//   for (let i = 0; i < keys.length; i++) userInfo[keys[i]] = values[i];

//   fetch(`${url}/${reg}`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userInfo),
//   })
//     .then(response => response.json())
//     .then(data => console.log('DATA', data))
//     .catch(error =>
//       console.error(`Can’t access ${url} response. Blocked by browser?`)
//     );

//   const path = 'allusers';
//   fetch(`${url}/${path}`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log(values.username);
//       for (let i = 0; i < data.length; i++) {
//         if (data[i].username === userInfo.username) {
//           console.log(data[i].id);
//         }
//       }
//     });
// }

// // function getUserId(e) {
// //   e.preventDefault();
// //   const path = 'allusers';

// //   fetch(`${url}/${path}`, {
// //     method: 'GET',
// //     headers: {
// //       Accept: 'application/json',
// //       'Content-Type': 'application/json',
// //     },
// //   })
// //     .then(response => response.json())
// //     .then(data => {
// //       for (let i = 0; i < data.length; i++) {
// //         if (data[i].id === );
// //       }
// //     });
// // }

// const url = 'http://localhost:5000/users';

// function postUserInfo(e) {
//   e.preventDefault();
//   const form = document.getElementById('signup-form');
//   const formData = new FormData(form);
//   const keys = [];
//   const values = [];
//   const reg = 'register';
//   for (const value of formData.values()) {
//     values.push(value);
//   }

//   for (const key of formData.keys()) {
//     keys.push(key);
//   }

//   const userInfo = {};
//   for (let i = 0; i < keys.length; i++) userInfo[keys[i]] = values[i];

//   console.log(`${url}/${reg}`);

//   fetch(`${url}/${reg}`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userInfo),
//   })
//     .then(response => {
//       console.log(response);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       fetch(`${url}/user/${data.id}`, {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//       });
//     })
//     .then(response => {
//       console.log(response);
//       return response.json();
//     })
//     .then(json => {
//       console.log(json);
//     })
//     .catch(error =>
//       console.error(`Can’t access ${url} response. Blocked by browser?`)
//     );
// }

const url = 'http://localhost:5000/users';

function postUserInfo(e) {
  console.log(e);
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

  console.log(`${url}/${reg}`);

  fetch(`${url}/${reg}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return fetch(`${url}/user/54UKgtFPu`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(error => console.error(error));
}
