import styled from 'styled-components'

const generalText = `
  color: white;
`

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

  div.avatar-card {
    width: 500px;
    height: 300px;
    background: #121212;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2.user-nickname {
      ${generalText}
      font-size: 30px;
    }

    p.user-rank {
      ${generalText}
      font-size: 20px;
    }
  }
`
