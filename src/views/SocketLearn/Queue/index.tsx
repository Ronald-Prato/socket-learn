/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'

import { Button } from 'antd'
import Context from '../../../globalState'
import { MainWrapper } from './styles'
import { NewMatchModal } from './NewMatchModal'
import { SOCKET_URI } from '../../../constants'
import axios from 'axios'
import { checkIfCurrentSession } from '../../../utils'
import io from 'socket.io-client'

const socket = io(SOCKET_URI)

export const Queue = () => {
  const { state, setCurrentUser } = useContext(Context)
  const { user: currentLSUser } = state
  const [isInQueue, setIsInQueue] = useState(false)
  const [matchFound, setMatchFoud] = useState(false)

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
      setMatchFoud(true)
    })
    socket.on('removed-from-queue', () => {
      setIsInQueue(false)
      setMatchFoud(false)
      alert('Removed from queue')
    })
    socket.on('match-canceled', () => {
      setMatchFoud(false)
      setIsInQueue(false)
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
      console.log(response)
    } catch (err) {
      // setGettingIntoQueue(false)
      console.log('Error: ', err)
      setIsInQueue(false)
    }
  }

  const handleAcceptMatch = () => {
    socket.emit('accept-match', currentLSUser.id)
  }

  const handleRejectMatch = () => {
    socket.emit('reject-match', currentLSUser)
  }

  return (
    <MainWrapper>
      <div className="avatar-card">
        <h2 className="user-nickname">{currentLSUser.nickname}</h2>
        <p className="user-rank">Rank: {currentLSUser.rank}</p>

        {!isInQueue ? (
          <Button type="primary" onClick={handleEnterInQueue}>
            Entrar en cola
          </Button>
        ) : (
          <Button type="primary" danger onClick={handleEnterInQueue}>
            Salir
          </Button>
        )}

        {/* <button onClick={() => socket.emit('request-greet')}>
          {' '}
          Check Queue{' '}
        </button>
        <br /> */}
        <button onClick={() => setMatchFoud(true)}> Check Users </button>
      </div>

      {matchFound && (
        <NewMatchModal
          message="Partida encontrada"
          onAccept={handleAcceptMatch}
          onReject={handleRejectMatch}
        />
      )}
    </MainWrapper>
  )
}
