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

  const setNewUser = (newUser: IUser) => {
    setState(
      produce(state, stateDraft => {
        stateDraft.user.id = newUser.id
        stateDraft.user.nickname = newUser.nickname
        stateDraft.user.rank = newUser.rank
      })
    )
  }

  return (
    <Context.Provider value={{ state, setNewUser }}>
      {children}
    </Context.Provider>
  )
}

export default Context
