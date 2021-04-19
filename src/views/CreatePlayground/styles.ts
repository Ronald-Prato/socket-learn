import styled from 'styled-components'

export const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ede9d8;

  div.top-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    h2.create-title {
      font-size: 30px;
      margin: 0;
    }

    p.create-subtitle {
      margin: 0;
      color: #323232;
      font-size: 16px;
    }
  }

  div.form-wrapper {
    width: 100%;
    max-width: 620px;
    height: 600px;
    padding: 25px;
    border-radius: 4px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    background: #404040;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    p.char-tracker {
      width: 100%;
      text-align: left;
      color: white;
      margin: 10px 0 0 4px;
    }

    textarea.question-input {
      padding: 10px;
      min-height: 50px;
      width: 100%;
      outline: none;
      border: none;
      background: #323232;
      border-radius: 5px;
      resize: none;
      color: white;
      font-size: 22px;
      text-align: center;
      font-weight: 500;
      overflow: hidden;
    }

    div.options-section {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin: 20px 0 40px 0;

      div.single-option-wrapper {
        width: 250px;
        height: 40px;
        padding: 0 10px;
        background: #323232;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 15px;

        p.option {
          color: white;
          margin: 0;
          font-size: 18px;
        }

        input.input-option {
          width: 80%;
          outline: none;
          border: none;
          background: #323232;
          color: white;
          font-size: 16px;
          padding: 0 10px;
          font-weight: 500;

          ::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
        }

        p.option-indicator {
          padding: 5px;
          margin: 0;
          cursor: pointer;
        }
      }
    }

    div.buttons-section {
      width: 30%;
      min-width: 150px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      bottom: 25px;
      left: 25px;
    }

    div.complete-modal {
      @keyframes apear {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      display: flex;
      justify-content: center;
      align-items: center;
      width: 550px;
      height: 50px;
      border-radius: 8px;
      position: absolute;
      margin: 0 auto;
      top: 25px;
      left: 0;
      right: 0;
      background: #50a35b;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
      cursor: pointer;
      animation: apear 200ms ease-in forwards;

      p.complete-modal-text {
        color: #ede9d8;
        margin: 0;
        font-size: 18px;
      }
    }

    div.loading-indicator {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 550px;
      height: 50px;
      position: absolute;
      margin: 0 auto;
      top: 25px;
      left: 0;
      right: 0;
    }
  }
`
