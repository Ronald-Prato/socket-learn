import { checkIfCurrentSession, exceptionCodeHashMap } from '../../../utils'
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'

import { Button } from 'antd'
import Context from '../../../globalState'
import { IRejectInfo } from './models'
import { IToast } from '../../../components/Toast/models'
import { MainWrapper } from './styles'
import { NewMatchModal } from './NewMatchModal'
import { SOCKET_URI } from '../../../constants'
import { Toast } from '../../../components/Toast'
import axios from 'axios'
import io from 'socket.io-client'

const socket = io(SOCKET_URI)

export const Queue = () => {
  const { state, setCurrentUser } = useContext(Context)
  const { user: currentLSUser } = state
  const [isInQueue, setIsInQueue] = useState(false)
  const [matchFound, setMatchFoud] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toast, setToast] = useState<IToast>({
    title: '',
    text: '',
    type: 'info',
    timer: 0,
    onClose: () => {},
  })

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

    socket.on('match-canceled', (info: IRejectInfo) => {
      setMatchFoud(false)

      if (info.guilty === currentLSUser.id) {
        const exceptionMessage = exceptionCodeHashMap(info.reason, 'self')
        const title = exceptionMessage.split('[%]')[0]
        const text = exceptionMessage.split('[%]')[1]
        setToast({
          title,
          text,
          type: 'error',
          timer: 3000,
          onClose: () => setShowToast(false),
        })
        setShowToast(true)
        setIsInQueue(false)
      }

      if (info.guilty !== currentLSUser.id) {
        const exceptionMessage = exceptionCodeHashMap(info.reason, 'other')
        const title = exceptionMessage.split('[%]')[0]
        const text = exceptionMessage.split('[%]')[1]
        setToast({
          title,
          text,
          type: 'info',
          timer: 3000,
          onClose: () => setShowToast(false),
        })
        setShowToast(true)
      }
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
        {/* <button onClick={() => setShowToast(true)}> Check Users </button> */}
      </div>

      {matchFound && (
        <NewMatchModal
          message="Partida encontrada"
          onAccept={handleAcceptMatch}
          onReject={handleRejectMatch}
        />
      )}

      {showToast && <Toast {...toast} />}
    </MainWrapper>
  )
}
