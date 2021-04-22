import styled from 'styled-components'

export const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;

  background-image: linear-gradient(
    to right top,
    rgba(2, 1, 25, 1) 2%,
    rgba(0, 0, 0, 1) 13%,
    rgba(0, 0, 0, 1) 27%,
    rgba(6, 29, 34, 1) 43%,
    rgba(8, 40, 43, 1) 55%,
    rgba(19, 51, 51, 1) 65%,
    rgba(6, 87, 82, 1) 76%,
    rgba(13, 90, 98, 1) 88%,
    rgba(8, 89, 102, 1) 93%,
    rgba(19, 91, 106, 1) 100%
  );

  div.game-arena {
    width: 50%;
    max-width: 600px;
    min-width: 300px;
    height: 30%;
    min-height: 500px;
    background: #323232;
    border-radius: 10px;
    padding: 60px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;

    div.block-opacity {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      top: 0;
      left: 0;
      border-radius: 10px;
      z-index: 100;
      cursor: not-allowed;
    }

    div.versus-section {
      display: flex;
      justify-content: center;
      align-items: center;

      div.avatar {
        @keyframes heartBeatUD {
          0% {
            transform: translateY(-20%);
          }

          50% {
            transform: translateY(20%);
          }
          100% {
            transform: translateY(-20%);
          }
        }

        @keyframes heartBeatDU {
          0% {
            transform: translateY(20%);
          }

          50% {
            transform: translateY(-20%);
          }
          100% {
            transform: translateY(20%);
          }
        }

        width: 8rem;
        height: 8rem;
        background: #101010;
        border-radius: 50%;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        animation: heartBeatUD infinite 2000ms ease-in-out;

        &:first-child {
          animation: heartBeatDU infinite 2000ms ease-in-out;
        }

        p.player-nickname {
          font-size: 1.2rem;
          font-weight: bolder;
          color: whitesmoke;
          margin: 0;
        }

        div.rank-info {
          width: 60%;
          display: grid;
          grid-template-columns: 1fr 1fr;

          img.player-rank-icon {
            width: 1.4rem;
            align-self: center;
            justify-self: center;
          }

          span.player-rank {
            color: white;
            font-size: 1.3rem;
            margin: 0;
            align-self: center;
            justify-self: center;
          }
        }
      }

      div.vs-icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin: 0 0.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          font-size: 20px;
          color: white;
          margin: 0;
        }
      }
    }

    div.state-indicator {
      position: absolute;
      bottom: 5%;
      margin: 0 auto;
      left: 0;
      right: 0;
      width: 100%;
      display: flex;
      flex-direction: column;

      span {
        text-align: center;
        font-size: 16px;
        color: whitesmoke;
      }
    }

    div.question-area {
      padding: 20px;
      height: 20rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      position: relative;

      p.question-counter {
        position: absolute;
        top: -20%;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: center;
        margin: 0;
        color: lightgreen;
        font-size: 1rem;
        font-weight: bolder;
      }

      h3.question {
        font-size: 1.2rem;
        text-align: center;
        color: white;
      }

      div.options-area {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        position: relative;

        div.single-option {
          cursor: pointer;
          width: 45%;
          min-width: 240px;
          background: #101010;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4),
            inset 0 0 3px 1px rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 12px 10px;
          margin: 10px 5px;
          overflow: hidden;
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 25px 1fr;

          p.option-letter {
            align-self: center;
            margin: 0;
            font-size: 1rem;
            color: whitesmoke;
          }

          p.option-text {
            align-self: center;
            margin: 0;
            font-size: 1rem;
            color: whitesmoke;
          }
        }
      }
    }
  }

  div.opacity-lock {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background: rgba(0, 0, 0, 0.4);
  }
`
