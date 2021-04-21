import Swal from 'sweetalert2'

type icon = 'warning' | 'error' | 'success' | 'info' | 'question'

interface IToast {
  title: string
  timer: number
  type?: icon
  text?: string
  progressBar?: boolean
}

export const toast = ({ title, timer, type, text, progressBar }: IToast) =>
  Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    title: title,
    text: text,
    icon: type, //built in icons: success, warning, error, info
    timer: timer, //timeOut for auto-close
    timerProgressBar: progressBar,
  })
