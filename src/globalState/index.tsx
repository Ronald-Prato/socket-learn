import produce from 'immer'
import { createContext, useState } from 'react'
import { IGlobalContext, IGlobalState, IState, IUser } from './models'

const Context = createContext<IGlobalContext>({} as IGlobalContext)

const initialState: IState = {
  user: {
    id: '',
    nickname: '',
    rank: 0,
  },
}

export const GlobalState = ({ children }: IGlobalState) => {
  const [state, setState] = useState<IState>(initialState)

  const setCurrentUser = (user: IUser) => {
    setState(
      produce(state, stateDraft => {
        stateDraft.user.id = user.id
        stateDraft.user.nickname = user.nickname
        stateDraft.user.rank = user.rank
      })
    )
  }

  return (
    <Context.Provider value={{ state, setCurrentUser }}>
      {children}
    </Context.Provider>
  )
}

export default Context
