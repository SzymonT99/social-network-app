import { Route, Switch } from 'react-router-dom';
import ActivityBoard from '../pages/ActivityBoard/ActivityBoard';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import AppTemplate from '../templates/AppTemplate';

const MainApplication = () => {
  return (
    <AppTemplate>
      <Switch>
        <Route exact path="/app" component={ActivityBoard} />
        <Route
          exact
          path="/app/profile/:selectedUserId"
          component={ProfilePage}
        />
      </Switch>
    </AppTemplate>
  );
};

export default MainApplication;
