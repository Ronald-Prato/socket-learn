import { ToastTypes } from './models'
import styled from 'styled-components'

const titleColorsHash: { [key: string]: string } = {
  success: '#56d170',
  error: 'tomato',
  info: 'white',
}

const subtitleColorsHash: { [key: string]: string } = {
  success: '#4ba65e',
  error: '#b5422d',
  info: 'white',
}

export const MainWrapper = styled.div<{ type: ToastTypes }>`
  @keyframes showup {
    from {
      opacity: 0.1;
    }
    to {
      opacity: 1;
    }
  }

  animation: showup linear 100ms forwards;
  width: 20%;
  min-width: 260px;
  max-width: 300px;
  position: fixed;
  top: 2%;
  left: 0;
  right: 0;
  margin: 0 auto;
  opacity: 0;
  padding: 6px 10px;
  box-sizing: border-box;
  background: #323232;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7),
    inset 0 0 4px 0.5px rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p.title {
    font-size: 16px;
    font-weight: bolder;
    color: ${({ type }) => titleColorsHash[type]};
    margin: 0;
  }

  span.text {
    font-size: 14px;
    color: ${({ type }) => subtitleColorsHash[type]};
  }
`
