import React from 'react'

export interface IGlobalContext {
  state: IState
  setNewUser: (newUser: IUser) => void
}

export interface IState {
  user: IUser
}

export interface IUser {
  id: string
  nickname: string
  rank: number
}

export interface IGlobalState {
  children: React.ReactChild
}
