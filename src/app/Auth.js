import { Route, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import AuthTemplate from '../templates/AuthTemplate';

const Auth = () => {
  return (
    <AuthTemplate>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route exact path="/auth/login" component={LoginPage} />
        <Route exact path="/auth/register" component={RegisterPage} />
      </Switch>
    </AuthTemplate>
  );
};

export default Auth;
