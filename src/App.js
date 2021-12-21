import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthTemplate from '../src/templates/AuthTemplate';
import LoginPage from '../src/pages/LoginPage/LoginPage';
import RegisterPage from '../src/pages/RegisterPage/RegisterPage';

const App = () => {
  return (
    <BrowserRouter>
      <AuthTemplate>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route exact path="/auth/login" component={LoginPage} />
          <Route exact path="/auth/register" component={RegisterPage} />
        </Switch>
      </AuthTemplate>
    </BrowserRouter>
  );
}

export default App;
