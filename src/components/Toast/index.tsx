/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { IToast } from './models'
import { MainWrapper } from './styles'

export const Toast = ({ title, timer, text, type, onClose }: IToast) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      onClose()
      setShow(false)
    }, timer)
  }, [])

  return (
    <>
      {show && (
        <MainWrapper type={type}>
          <p className="title"> {title} </p>
          <span className="text"> {text} </span>
        </MainWrapper>
      )}
    </>
  )
}
