import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

/**
 * Lets the user know their spark successfully uploaded.
 */
const critiqueSuccessAlert = event => {
    MySwal.fire({
      title: 'Critique has successfully uploaded!',
      icon: 'success',
      type: null,
      confirmButtonText: 'Close',
      text: 'Try again!',
      closeOnConfirm: false,
      closeOnCancel: false,
      allowOutsideClick: false,
      confirmButtonColor: "var(--electra-cool)"
    })
};

export default critiqueSuccessAlert;