import swal from 'sweetalert2';

const Warning = ({ text, callback, warnButtonText }) => {
  return swal({
    title: 'Are you sure?',
    text: text || 'Will be deleted!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: warnButtonText || 'Yes, delete it!',
  }).then(({ value }) => {
    if (value === true) {
      callback();
    }
  });
};

export default Warning;
