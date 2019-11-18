import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

/**
 * Prompts the user to log in, so they can upload a spark.
 */
const getLoggedInAlert = event => {
    MySwal.fire({
      title: 'Please Login!',
      icon: 'info',
      type: null,
      confirmButtonText: 'Close',
      text: 'Get logged in to share you Spark with the community!',
      closeOnConfirm: false,
      closeOnCancel: false,
      allowOutsideClick: false,
      confirmButtonColor: "var(--electra-cool)"
    })
  }

export default getLoggedInAlert;