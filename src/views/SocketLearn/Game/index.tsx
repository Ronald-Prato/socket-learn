import { MainWrapper } from './styles'
import axios from 'axios'
import io from 'socket.io-client'

export const Game = () => {
  const checkThingsOut = async () => {
    try {
      const response = await axios('http://localhost:8003/check')
      console.log('Response: ', response)
    } catch (err) {
      console.log('There was an error ', err)
    }
  }

  const sendThings = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8003/start-new-game',
        {
          hello: 'there',
        }
      )
      console.log('Response: ', response)
    } catch (err) {
      console.log('There was an error ', err)
    }
  }

  return (
    <MainWrapper>
      <button onClick={checkThingsOut}>Check things out</button>
      <button onClick={sendThings}>Send things out</button>
    </MainWrapper>
  )
}
