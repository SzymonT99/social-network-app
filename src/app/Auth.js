import { Route, Switch } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import AuthTemplate from '../templates/AuthTemplate';
import AccountActivatePage from '../pages/AccountActivatePage/AccountActivatePage';
import ForgetPasswordPage from '../pages/ForgetPasswordPage/ForgetPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage/ResetPasswordPage';

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
        <Route
          exact
          path="/auth/forget-password"
          component={ForgetPasswordPage}
        />
        <Route
          exact
          path="/auth/reset-password/:resetCode"
          component={ResetPasswordPage}
        />
      </Switch>
    </AuthTemplate>
  );
};

export default Auth;
