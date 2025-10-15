import { eventBusService } from '../services/event-bus.service.js'
const { useEffect } = React

export function UserMsg() {

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      showSweetAlert(msg)
    })
    return unsubscribe
  }, [])

  function showSweetAlert(msg) {
    const { type, txt } = msg

    const iconMap = {
      success: 'success',
      error: 'error',
      warning: 'warning',
      info: 'info'
    }

    Swal.fire({
      title: txt || 'Something happened!',
      icon: iconMap[type] || 'info',
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
      position: 'center',
      toast: true,
      background: '#fff',
      color: '#333',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }

  return null // No need to render anything
}
