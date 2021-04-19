/* eslint-disable react-hooks/exhaustive-deps */
import { MainWrapper } from './styles'
import { Button, Input } from 'antd'
import {
  createUUID,
  setInLocalStorage,
  checkIfCurrentSession,
} from '../../utils'
import { useContext, useEffect, useState } from 'react'
import Context from '../../globalState'
import { IUser } from '../../globalState/models'
import { useHistory } from 'react-router-dom'
import { db } from '../../firebase'

export const Login = () => {
  const { setCurrentUser } = useContext(Context)
  const [userNickname, setUserNickname] = useState('')
  const [charCounter, setCharCounter] = useState(0)
  const maxNicknameLength = 12
  const history = useHistory()

  useEffect(() => {
    const currentUser = checkIfCurrentSession()
    if (currentUser) {
      setCurrentUser(currentUser)
      history.push('/create-playground')
    }
  }, [])

  const handleSubmit = () => {
    const newUser: IUser = {
      id: createUUID(),
      nickname: userNickname,
      rank: 0,
    }

    db.collection('users')
      .doc()
      .set(newUser)
      .then(() => {
        console.log('%cUser created', 'color: green; font-weight: bolder')

        setInLocalStorage('current-user', newUser)
        setCurrentUser(newUser)
        history.push('/create-playground')
      })
      .catch(err => {
        console.log(
          '%cError creating the post',
          'color: red; font-weight: bolder',
          err
        )
        alert('Hubo un error ingresando, vuelve a intentarlo')
      })
  }

  const handleCharCounter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value
    setCharCounter(currentValue.length)

    currentValue.length < maxNicknameLength && setUserNickname(currentValue)
  }

  return (
    <MainWrapper>
      <div className="form-wrapper">
        <p className="form-label"> Nickname </p>
        <Input
          name="nickname"
          placeholder="Ingresa un Nickname"
          value={userNickname}
          onChange={handleCharCounter}
        />

        <p className="char-counter">
          {' '}
          {charCounter}/{maxNicknameLength}{' '}
        </p>

        <div className="buttons-container">
          <Button
            disabled={userNickname.trim().length === 0}
            type="primary"
            onClick={handleSubmit}
          >
            {' '}
            Entrar{' '}
          </Button>
        </div>
      </div>
    </MainWrapper>
  )
}
