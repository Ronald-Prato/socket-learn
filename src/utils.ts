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

type HashOptions = 'self' | 'other'
export const exceptionCodeHashMap = (key: string, option?: HashOptions) => {
  const hashMap: { [key: string]: string } = {
    MatchRejected:
      option === 'self'
        ? 'Has abandonado la partida[%]Te devolvimos al lobby'
        : 'Un usuario ha rechazado la partida[%]Te hemos devuelto a la cola',
    GameServerError:
      'Hubo un problema en el servidor[%]Intenta de nuevo más tarde',
  }

  return hashMap[key]
}
