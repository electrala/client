import axios from 'axios';

/**
 * Adds a user to our users table on postgres.
 * If there's an error, alert the user.
 * @param {object} data This is the data from the sign up form
 */
const signUp = async data => {
  try {
    const new_user = await axios.post('https://electra-la-development.herokuapp.com/users/register', data);
    const new_user_data = JSON.parse(new_user.config.data);
    // console.log(new_user_data);
  } catch {
    alert("error");
  }
}

export default signUp;