import { Route, Switch } from 'react-router-dom';
import TestPage from '../pages/TestPage/TestPage';
import AppTemplate from '../templates/AppTemplate';

const MainApplication = () => {
  return (
    <AppTemplate>
      <Switch>
        <Route exact path="/app" component={TestPage} />
      </Switch>
    </AppTemplate>
  );
};

export default MainApplication;
