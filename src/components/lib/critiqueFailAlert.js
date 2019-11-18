import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const critiqueFailAlert = event => {
    MySwal.fire({
      title: 'Critique Failed to upload!',
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

export default critiqueFailAlert;