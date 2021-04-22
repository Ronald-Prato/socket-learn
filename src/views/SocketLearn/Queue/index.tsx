import { checkIfCurrentSession, exceptionCodeHashMap } from '../../../utils'
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'

import { Button } from 'antd'
import Context from '../../../globalState'
import { IToast } from '../../../components/Toast/models'
import { MainWrapper } from './styles'
import { NewMatchModal } from './NewMatchModal'
import { RejectReasonCode } from './models'
import { SOCKET_URI } from '../../../constants'
import { Toast } from '../../../components/Toast'
import axios from 'axios'
import io from 'socket.io-client'
import { useHistory } from 'react-router-dom'

const socket = io(SOCKET_URI)

export const Queue = () => {
  const history = useHistory()
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

    socket.on('removed-from-queue', (rejectCode: RejectReasonCode) => {
      setIsInQueue(false) // remove the user from the queue
      setMatchFoud(false) // hide the modal

      const exceptionMessage = exceptionCodeHashMap(rejectCode, 'self')
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
    })

    socket.on('match-canceled', (rejectCode: RejectReasonCode) => {
      setMatchFoud(false) // just hide the modal but stills in queue
      rejectCode !== 'MatchRejected' && setIsInQueue(false)
      const exceptionMessage = exceptionCodeHashMap(rejectCode, 'other')
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
    })

    socket.on('match-accepted', () => {
      history.push('/io')
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
        {/* <button onClick={() => socket.emit('check-users')}>
          {' '}
          Check Users{' '}
        </button> */}
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
