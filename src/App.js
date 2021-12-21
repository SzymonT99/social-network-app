import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/auth/login" component={LoginPage} />
        <Route exact path="/auth/register" component={RegisterPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
