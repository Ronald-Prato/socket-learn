import './index.css'
import 'antd/dist/antd.css'
import 'sweetalert2/dist/sweetalert2.css'

import App from './App'
import { GlobalState } from './globalState'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <React.StrictMode>
    <GlobalState>
      <App />
    </GlobalState>
  </React.StrictMode>,
  document.getElementById('root')
)
