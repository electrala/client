import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const loginFailAlert = event => {
    MySwal.fire({
      title: 'Login Failed',
      icon: 'error',
      type: null,
      confirmButtonText: 'Close',
      text: 'Try again!',
      closeOnConfirm: false,
      closeOnCancel: false,
      allowOutsideClick: false,
      confirmButtonColor: "var(--electra-cool)"
    })
};

export default loginFailAlert;