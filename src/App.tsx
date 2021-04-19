import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import { CreatePlayground } from './views/CreatePlayground'
import { Login } from './views/Login'

const Redirect = () => {
  const history = useHistory()
  const handleRedirection = () => {
    history.replace('/login')
  }

  return <>{handleRedirection()}</>
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Redirect} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/create-playground" component={CreatePlayground} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
