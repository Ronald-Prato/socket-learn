import { INewMatchModal } from './models'
import { MainWrapper } from './styles'
import { Spin } from 'antd'
import checkIcon from '../../../../assets/icons/check.svg'
import { useState } from 'react'
import xIcon from '../../../../assets/icons/x.svg'

export const NewMatchModal = ({
  message,
  onAccept,
  onReject,
}: INewMatchModal) => {
  const [isAccepting, setIsAccepting] = useState(false)

  const handleAccept = () => {
    onAccept()
    setIsAccepting(true)
  }

  return (
    <MainWrapper className="match-found-modal">
      <div className="modal-opacity" />
      <div className="main-content">
        {isAccepting ? (
          <Spin size="large" />
        ) : (
          <div>
            <h2 className="main-message"> {message} </h2>
            <div className="buttons-section">
              <div onClick={onReject} className="single-button">
                <img alt="rechazar" src={xIcon} className="reject" />
                <p> Rechazar </p>
              </div>

              <div onClick={handleAccept} className="single-button">
                <img alt="aceptar" src={checkIcon} className="accept" />
                <p> Aceptar </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainWrapper>
  )
}
