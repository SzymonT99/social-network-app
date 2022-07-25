import { Route, Switch } from 'react-router-dom';
import ActivityBoard from '../pages/ActivityBoardPage/ActivityBoard';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import AppTemplate from '../templates/AppTemplate';
import EventsPage from '../pages/EventsPage/EventsPage';
import EventsPageDetails from '../pages/EventDetailsPage/EventDetailsPage';
import FriendsPage from '../pages/FriendsPage/FriendsPage';
import SettingsPage from '../pages/AccountSettingsPage/AccountSettingsPage';
import FavouritePostsPage from '../pages/FavouritePostsPage/FavouritePostsPage';
import GroupsPage from '../pages/GroupsPage/GroupsPage';
import GroupDetailsPage from '../pages/GroupDetailsPage/GroupDetailsPage';
import PostDetailsPage from '../pages/PostDetailsPage/PostDetailsPage';
import ChatPage from '../pages/ChatPage/ChatPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import React from 'react';
import PublicPostsPage from '../pages/PublicPostsPage/PublicPostsPage';
import AdminPanel from '../pages/AdminPanel/AdminPanel';

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
        <Route
          exact
          path="/app/favourite-posts"
          component={FavouritePostsPage}
        />
        <Route exact path="/app/groups" component={GroupsPage} />
        <Route exact path="/app/groups/:groupId" component={GroupDetailsPage} />
        <Route exact path="/app/posts/:postId" component={PostDetailsPage} />
        <Route exact path="/app/chat" component={ChatPage} />
        <Route exact path="/app/public" component={PublicPostsPage} />
        <Route exact path="/app/admin" component={AdminPanel} />
        <Route component={NotFoundPage} />
      </Switch>
    </AppTemplate>
  );
};

export default MainApplication;
