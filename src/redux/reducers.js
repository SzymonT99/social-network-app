import { combineReducers } from 'redux';
import authReducer from '../redux/reducers/authReducer';
import notificationReducer from '../redux/reducers/notificationReducer';
import userActivityReducer from './reducers/userActivityReducer';
import userProfileReducer from './reducers/userProfileReducer';
import eventReducer from './reducers/eventReducer';
import friendReducer from './reducers/friendReducer';
import groupReducer from './reducers/groupReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  activity: userActivityReducer,
  selectedProfile: userProfileReducer,
  events: eventReducer,
  friends: friendReducer,
  groups: groupReducer,
});

export default rootReducer;
