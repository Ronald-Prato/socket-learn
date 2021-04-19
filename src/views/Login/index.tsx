/* eslint-disable react-hooks/exhaustive-deps */
import { MainWrapper } from './styles'
import { Button, Input } from 'antd'
import { createUUID, setInLocalStorage, getFromLocalStorage } from '../../utils'
import { useContext, useEffect, useState } from 'react'
import Context from '../../globalState'
import { IUser } from '../../globalState/models'
import { useHistory } from 'react-router-dom'

export const Login = () => {
  const { setCurrentUser } = useContext(Context)
  const [userNickname, setUserNickname] = useState('')
  const [charCounter, setCharCounter] = useState(0)
  const maxNicknameLength = 12
  const history = useHistory()

  useEffect(() => {
    if (getFromLocalStorage('current-user')) {
      const parsedUser: IUser = JSON.parse(
        getFromLocalStorage('current-user') as string
      )

      setCurrentUser(parsedUser)
      history.push('/create-playground')
    }
  }, [])

  const handleSubmit = () => {
    const newUser: IUser = {
      id: createUUID(),
      nickname: userNickname,
      rank: 0,
    }

    setInLocalStorage('current-user', newUser)
    setCurrentUser(newUser)
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
