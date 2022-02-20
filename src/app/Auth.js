import { Route, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import AuthTemplate from '../templates/AuthTemplate';
import AccountActivatePage from '../pages/AccountActivatePage/AccountActivatePage';

const Auth = () => {
  return (
    <AuthTemplate>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/auth/login" component={LoginPage} />
        <Route exact path="/auth/register" component={RegisterPage} />
        <Route
          exact
          path="/auth/activate-account/:token"
          component={AccountActivatePage}
        />
      </Switch>
    </AuthTemplate>
  );
};

export default Auth;
