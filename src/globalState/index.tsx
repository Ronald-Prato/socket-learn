import { IGlobalContext, IGlobalState, IState, IUser } from './models'
import { createContext, useState } from 'react'

import produce from 'immer'

const Context = createContext<IGlobalContext>({} as IGlobalContext)

const initialState: IState = {
  user: {
    id: '',
    nickname: '',
    rank: 0,
  },
  gameRoom: [],
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

  const setNewGameRoom = (newRoom: IUser[]) => {
    setState({
      ...state,
      gameRoom: newRoom,
    })
  }

  return (
    <Context.Provider value={{ state, setCurrentUser, setNewGameRoom }}>
      {children}
    </Context.Provider>
  )
}

export default Context
