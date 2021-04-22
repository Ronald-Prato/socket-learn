import { Button, Spin } from 'antd'
import { useContext, useEffect, useState } from 'react'

import Context from '../../../globalState'
/* eslint-disable react-hooks/exhaustive-deps */
import { GAME_URI } from '../../../constants'
import { MainWrapper } from './styles'
import { checkIfCurrentSession } from '../../../utils'
import io from 'socket.io-client'
import rankIcon from '../../../assets/icons/rank.svg'

const socket = io(GAME_URI)

export const Game = () => {
  const { state, setCurrentUser } = useContext(Context)
  const { user: currentLSUser, gameRoom } = state
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const currentUser = checkIfCurrentSession()
    setCurrentUser(currentUser)
  }, [])

  useEffect(() => {
    socket.emit('check-in', currentLSUser.id)

    socket.on('waiting-for-players-to-be-ready', (roomId: string) => {
      setIsReady(true)
    })
  }, [])

  const handlePlayerReady = () => {
    socket.emit('player-ready', currentLSUser.id)
  }

  return (
    <MainWrapper>
      <div className="game-arena">
        <div className="versus-section">
          <div className="avatar">
            <p className="player-nickname"> {gameRoom[0].nickname} </p>
            <div className="rank-info">
              <img alt="rank" src={rankIcon} className="player-rank-icon" />
              <span className="player-rank"> {gameRoom[0].rank} </span>
            </div>
          </div>

          <div className="vs-icon">
            <p> VS </p>
          </div>

          <div className="avatar">
            <p className="player-nickname"> {gameRoom[1].nickname} </p>
            <div className="rank-info">
              <img alt="rank" src={rankIcon} className="player-rank-icon" />
              <span className="player-rank"> {gameRoom[1].rank} </span>
            </div>
          </div>
        </div>

        <Button disabled={isReady} onClick={handlePlayerReady} type="primary">
          Empezar
        </Button>

        {isReady && (
          <div className="state-indicator">
            <Spin size="large" />
            <span> Esperando a que los demás jugadores estén listos </span>
          </div>
        )}
      </div>

      {/* <button onClick={checkThingsOut}>Check things out</button>
      <button onClick={sendThings}>Send things out</button> */}
    </MainWrapper>
  )
}
