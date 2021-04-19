/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { checkIfCurrentSession } from './utils'
import { CreatePlayground } from './views/CreatePlayground'
import { Home } from './views/Home'
import { Login } from './views/Login'

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
      </Switch>
    </BrowserRouter>
  )
}

export default App
