/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'

import { Button } from 'antd'
import Context from '../../../globalState'
import { MainWrapper } from './styles'
import { SOCKET_URI } from '../../../constants'
import axios from 'axios'
import { checkIfCurrentSession } from '../../../utils'
import io from 'socket.io-client'

const socket = io(SOCKET_URI)

export const Queue = () => {
  const { state, setCurrentUser } = useContext(Context)
  const { user: currentLSUser } = state
  const [isInQueue, setIsInQueue] = useState(false)

  useEffect(() => {
    const currentUser = checkIfCurrentSession()
    setCurrentUser(currentUser)
    socket.emit('new-user', currentUser)
  }, [])

  useEffect(() => {
    //socket.emit('new-user', state.user)
    socket.emit('check-in', state.user.id)
  }, [state.user])

  // This is only to register lifetime-use sockets listeners
  useEffect(() => {
    socket.on('matched', () => {
      // setShowModal(true)
    })
  }, [])

  const handleEnterInQueue = async () => {
    setIsInQueue(true)
    console.log(currentLSUser)
    try {
      const response = await axios.post(`${SOCKET_URI}/get-in-queue`, {
        userId: currentLSUser.id,
      })
      // setGettingIntoQueue(false)
      setIsInQueue(false)
      console.log(response)
    } catch (err) {
      // setGettingIntoQueue(false)
      console.log('Error: ', err)
      setIsInQueue(false)
    }
  }

  return (
    <MainWrapper>
      <div className="avatar-card">
        <h2 className="user-nickname">{currentLSUser.nickname}</h2>
        <p className="user-rank">Rank: {currentLSUser.rank}</p>

        <Button
          disabled={isInQueue}
          type="primary"
          onClick={handleEnterInQueue}
        >
          Entrar en cola
        </Button>

        <button onClick={() => socket.emit('request-greet')}>
          {' '}
          Check Queue{' '}
        </button>
        <br />
        <button onClick={() => socket.emit('check-users')}>
          {' '}
          Check Users{' '}
        </button>
      </div>
    </MainWrapper>
  )
}
