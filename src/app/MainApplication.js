import { Route, Switch } from 'react-router-dom';
import ActivityBoard from '../pages/ActivityBoard/ActivityBoard';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import AppTemplate from '../templates/AppTemplate';
import EventsPage from '../pages/EventsPage/EventsPage';
import EventsPageDetails from '../pages/EventDetailsPage/EventDetailsPage';
import FriendsPage from '../pages/FriendsPage/FriendsPage';
import SettingsPage from '../pages/AccountSettingsPage/AccountSettingsPage';

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
        <Route exact path="/app/friends" component={FriendsPage} />
        <Route exact path="/app/settings" component={SettingsPage} />
      </Switch>
    </AppTemplate>
  );
};

export default MainApplication;
