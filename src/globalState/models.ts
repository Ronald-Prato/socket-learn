import React from 'react'

export interface IGlobalContext {
  state: IState
  setCurrentUser: (user: IUser) => void
  setNewGameRoom: (newRoom: IUser[]) => void
}

export interface IState {
  user: IUser
  gameRoom: IUser[]
}

export interface IUser {
  id: string
  nickname: string
  rank: number
}

export interface IGlobalState {
  children: React.ReactChild
}
