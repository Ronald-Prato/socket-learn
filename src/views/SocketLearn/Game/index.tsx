import { Button, Spin } from 'antd'
import { useContext, useEffect, useState } from 'react'

import Context from '../../../globalState'
/* eslint-disable react-hooks/exhaustive-deps */
import { GAME_URI } from '../../../constants'
import { IAPIQuestion } from './models'
import { IToast } from '../../../components/Toast/models'
import { MainWrapper } from './styles'
import { Toast } from '../../../components/Toast'
import _ from 'underscore'
import { checkIfCurrentSession } from '../../../utils'
import io from 'socket.io-client'
import rankIcon from '../../../assets/icons/rank.svg'

const socket = io(GAME_URI)

export const Game = () => {
  const { state, setCurrentUser } = useContext(Context)
  const { user: currentLSUser, gameRoom } = state
  const [isReady, setIsReady] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [questionCounter, setQuestionCounter] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const maxQuestionPerRound = 3
  const [toast, setToast] = useState<IToast>({} as IToast)
  const [showInformativeToast, setShowInformativeToast] = useState(false)
  const [showAttemptResponse, setShowAttemptResponse] = useState(false)
  const [localQuestion, setLocalQuestion] = useState<IAPIQuestion>(
    {} as IAPIQuestion
  )

  useEffect(() => {
    const currentUser = checkIfCurrentSession()
    setCurrentUser(currentUser)
  }, [])

  useEffect(() => {
    socket.emit('check-in', currentLSUser.id)

    socket.on('waiting-for-players-to-be-ready', (roomId: string) => {
      setIsReady(true)
    })

    socket.on('initialize-game', () => {
      setGameStarted(true)
    })

    socket.on('new-question', (newQuestion: IAPIQuestion) => {
      console.log('New Question', newQuestion)
      setLocalQuestion(newQuestion)
      setQuestionCounter(questionCounter + 1)
    })

    socket.on('block-turn', (wrongUserId: string) => {
      if (wrongUserId === currentLSUser.id) {
        const playerTurn = gameRoom.filter(
          singleUser => singleUser.id !== wrongUserId
        )[0]
        setToast({
          title: `${currentLSUser.nickname} se ha equivocado`,
          text: `Turno de ${playerTurn.nickname}`,
          timer: 3000,
          type: 'info',
          onClose: () => {},
        })
        setIsBlocked(true)
        setShowInformativeToast(true)
      }
    })

    socket.on('next-round', (roundWinner: string) => {
      alert('should not here')
      setToast({
        title: `${roundWinner} ha acertado`,
        text: 'Buscando siguiente pregunta',
        timer: 3000,
        type: 'success',
        onClose: () => {},
      })
      setShowAttemptResponse(true)
    })
  }, [state.user])

  const handlePlayerReady = () => {
    socket.emit('player-ready', currentLSUser.id)
  }

  const getRandomOrderOptions = () => {
    const optionsArr = [
      localQuestion.correct_answer,
      ...localQuestion.incorrect_answers,
    ]
    return optionsArr.sort(() => 0.5 - Math.random() * 10)
  }

  const getLetter = (index: number) => {
    const letterHashMap: { [index: number]: string } = {
      0: 'A',
      1: 'B',
      2: 'C',
      3: 'D',
    }

    return letterHashMap[index]
  }

  const handleAttempt = (answer: string) => {
    if (answer !== localQuestion.correct_answer) {
      sendWrongAttempt()
      return
    }

    sendCorrectAttempt()
  }

  const sendCorrectAttempt = () => {
    socket.emit('correct-attempt', currentLSUser.id)
  }

  const sendWrongAttempt = () => {
    socket.emit('wrong-attempt', currentLSUser.id)
  }

  return (
    <MainWrapper>
      <div className="game-arena">
        {isBlocked && (
          <>
            <div className="block-opacity" />
          </>
        )}
        {showInformativeToast && <Toast {...toast} />}
        {!gameStarted ? (
          <>
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

            <Button
              disabled={isReady}
              onClick={handlePlayerReady}
              type="primary"
            >
              Empezar
            </Button>
          </>
        ) : (
          Object.keys(localQuestion).length > 0 && (
            <div className="question-area">
              <p className="question-counter">
                {' '}
                {questionCounter} / {maxQuestionPerRound}{' '}
              </p>

              <h3 className="question">
                {' '}
                {_.unescape(localQuestion.question)}{' '}
              </h3>

              <div className="options-area">
                {getRandomOrderOptions().map((singleOption, index) => (
                  <div
                    onClick={() => !isBlocked && handleAttempt(singleOption)}
                    key={index}
                    className="single-option"
                  >
                    <p className="option-letter"> {getLetter(index)}. </p>
                    <p className="option-text"> {singleOption} </p>
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {isReady && !gameStarted && (
          <div className="state-indicator">
            <Spin size="large" />
            <span> Esperando a que los demás jugadores estén listos </span>
          </div>
        )}
      </div>

      {showAttemptResponse && (
        <>
          <div className="opacity-lock" />
          <Toast {...toast} />
        </>
      )}

      {/* <button onClick={checkThingsOut}>Check things out</button>
      <button onClick={sendThings}>Send things out</button> */}
    </MainWrapper>
  )
}
