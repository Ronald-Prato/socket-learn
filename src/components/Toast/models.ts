export type ToastTypes = 'success' | 'error' | 'info'

export interface IToast {
  title: string
  text: string
  timer: number
  type: ToastTypes
  onClose: () => void
}
