import { Route, Switch } from 'react-router-dom';
import ActivityBoard from '../pages/ActivityBoard/ActivityBoard';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import AppTemplate from '../templates/AppTemplate';
import EventsPage from '../pages/EventsPage/EventsPage';
import EventsPageDetails from '../pages/EventPageDetails/EventPageDetails';

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
        <Route exact path="/app/events" component={EventsPage} />
        <Route
          exact
          path="/app/events/:eventId"
          component={EventsPageDetails}
        />
      </Switch>
    </AppTemplate>
  );
};

export default MainApplication;
