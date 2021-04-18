import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import { CreatePlayground } from './views/CreatePlayground'

const Redirect = () => {
  const history = useHistory()
  const handleRedirection = () => {
    history.replace('/create-playground')
  }

  return <>{handleRedirection()}</>
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Redirect} />
        <Route exact path="/login" />
        <Route exact path="/create-playground" component={CreatePlayground} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
