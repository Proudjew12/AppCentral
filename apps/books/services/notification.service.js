export const notify = {
    success,
    error,
    toast,
    confirmDelete,
}

function success(msg) {
    Swal.fire({
        title: '✅ Success!',
        text: msg,
        icon: 'success',
        confirmButtonColor: '#ffb347',
        background: '#1e1f22',
        color: '#fff',
    })
}

function error(msg) {
    Swal.fire({
        title: '❌ Error',
        text: msg,
        icon: 'error',
        confirmButtonColor: '#e63946',
        background: '#1e1f22',
        color: '#fff',
    })
}

function toast(msg, type = 'success') {
    const icons = {
        success: '✅',
        info: 'ℹ️',
        error: '❌',
    }

    const colors = {
        success: '#ffb347',
        info: '#4dabf7',
        error: '#e63946',
    }

    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        title: `${icons[type]} ${msg}`,
        background: '#2a2c30',
        color: '#fff',
        iconColor: colors[type],
    })
}

function confirmDelete(msg = 'Are you sure?') {
    return Swal.fire({
        title: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        background: '#1e1f22',
        color: '#fff',
        confirmButtonColor: '#e63946',
        cancelButtonColor: '#555',
    })
}
