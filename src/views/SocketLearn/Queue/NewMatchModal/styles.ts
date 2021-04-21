import styled from 'styled-components'

export const MainWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: grid;
  place-items: center;

  div.modal-opacity {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 0;
  }

  div.main-content {
    @keyframes slideup {
      0% {
        transform: scale(0.1);
      }

      70% {
        transform: scale(1.2);
      }

      100% {
        transform: scale(1);
      }
    }

    width: 90%;
    max-width: 500px;
    min-width: 300px;
    height: 35%;
    max-height: 400px;
    background: #151515;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7),
      inset 0 0 4px 0.5px rgba(255, 255, 255, 0.05);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 10;
    transform: scale(0);
    animation: slideup linear 120ms 80ms forwards;

    h2.main-message {
      margin: 0;
      font-size: 1.8rem;
      color: white;
    }

    div.buttons-section {
      padding: 0 12%;
      margin-top: 10%;
      width: 100%;
      display: flex;
      justify-content: space-between;

      div.single-button {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        cursor: pointer;
      }

      img.accept,
      img.reject {
        width: 3.5em;
        margin-bottom: 5px;
      }
    }
  }
`
