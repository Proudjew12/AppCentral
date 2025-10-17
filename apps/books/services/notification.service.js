
export const notify = {
    success,
    error,
    info,
    confirm,
    confirmDelete,
    toast,
}

function success(msg = 'Success', title = '') {
    Swal.fire({ icon: 'success', title, text: msg, timer: 1200, showConfirmButton: false })
}
function error(msg = 'Something went wrong', title = 'Error') {
    Swal.fire({ icon: 'error', title, text: msg })
}
function info(msg = '', title = 'Info') {
    Swal.fire({ icon: 'info', title, text: msg })
}
function confirm(msg = 'Are you sure?', options = {}) {
    return Swal.fire({
        title: msg,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#3085d6',
        ...options,
    })
}
function confirmDelete(msg = 'Delete this item?') {
    return Swal.fire({
        title: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33',
    })
}
function toast(msg, type = 'success', timer = 1500) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer,
        timerProgressBar: true,
    })
    Toast.fire({ icon: type, title: msg })
}
