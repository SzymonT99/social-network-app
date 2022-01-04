import { combineReducers } from 'redux';
import authReducer from '../redux/reducers/authReducer';
import notificationReducer from '../redux/reducers/notificationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
});

export default rootReducer;
