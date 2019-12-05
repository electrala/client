import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

/**
 * Lets the user know they logged in successfully.
 */
const loginSuccessAlert = event => {
    MySwal.fire({
      title: 'Successful Login!',
      icon: 'success',
      type: null,
      confirmButtonText: 'Close',
      text: 'You are all set to do amazing things',
      closeOnConfirm: false,
      closeOnCancel: false,
      allowOutsideClick: false,
      confirmButtonColor: "var(--electra-cool)"
    })
};

export default loginSuccessAlert;