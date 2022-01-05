import { Route, Switch } from 'react-router-dom';
import ActivityBoard from '../pages/ActivityBoard/ActivityBoard';
import AppTemplate from '../templates/AppTemplate';

const MainApplication = () => {
  return (
    <AppTemplate>
      <Switch>
        <Route exact path="/app" component={ActivityBoard} />
      </Switch>
    </AppTemplate>
  );
};

export default MainApplication;
