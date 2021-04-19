import styled from 'styled-components'

export const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: grid;
  place-items: center;

  div.form-wrapper {
    width: 400px;
    height: 200px;
    border-radius: 10px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);
    background: #404040;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;

    p.form-label {
      margin: 0;
      color: white;
    }

    p.char-counter {
      margin: 0 0 10px 0;
      color: white;
    }
  }

  div.buttons-container {
    /* margin: 20px 0; */
  }
`
