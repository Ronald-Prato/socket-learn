export const createUUID = () => {
  return `${Math.random().toString(16).substr(2, 15)}-${Math.random()
    .toString(16)
    .substr(2, 15)}-${Math.random()
    .toString(16)
    .substr(2, 15)}-${Math.random().toString(16).substr(2, 15)}`
}

export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key)
}

export const setInLocalStorage = (key: string, value: any) => {
  const parsedValue = JSON.stringify(value)
  localStorage.setItem(key, parsedValue)
}

export const checkIfCurrentSession = () => {
  const parsedUser = JSON.parse(getFromLocalStorage('current-user') as string)

  if (!parsedUser) {
    return false
  }

  return parsedUser
}
