import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { CreatePlayground } from './views/CreatePlayground'
import { Game } from './views/SocketLearn/Game'
import { Home } from './views/Home'
import { Login } from './views/Login'
import { Queue } from './views/SocketLearn/Queue'
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { checkIfCurrentSession } from './utils'

interface IPrivateRoute {
  component: React.ComponentType<any>
  path: string
  exact: boolean
}

const PrivateRoute = ({ component, path, exact }: IPrivateRoute) => {
  const currentUser = checkIfCurrentSession()
  if (!currentUser) {
    return <Redirect to="/login" />
  }

  return <Route exact={exact} component={component} path={path} />
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          exact
          path="/create-playground"
          component={CreatePlayground}
        />
        <PrivateRoute exact path="/queue" component={Queue} />
        <PrivateRoute exact path="/io" component={Game} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
