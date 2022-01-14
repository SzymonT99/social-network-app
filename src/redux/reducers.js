import { combineReducers } from 'redux';
import authReducer from '../redux/reducers/authReducer';
import notificationReducer from '../redux/reducers/notificationReducer';
import userActivityReducer from './reducers/userActivityReducer';
import userProfileReducer from './reducers/userProfileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  activity: userActivityReducer,
  profile: userProfileReducer,
});

export default rootReducer;
