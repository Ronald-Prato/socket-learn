/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const Home = () => {
  const history = useHistory()
  useEffect(() => {
    history.push('/login')
  }, [])

  return <></>
}
