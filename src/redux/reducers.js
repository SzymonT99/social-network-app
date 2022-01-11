import { combineReducers } from 'redux';
import authReducer from '../redux/reducers/authReducer';
import notificationReducer from '../redux/reducers/notificationReducer';
import activityReducer from './reducers/activityReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  activity: activityReducer,
});

export default rootReducer;
