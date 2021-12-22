import { createStore } from 'redux';
import rootReducer from './reducers';
import { loadState, saveState } from '../localStorage';

const configureStore = (initialState = {}) => {
  const persistedState = loadState();

  const store = createStore(
    rootReducer,
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    persistedState
  );

  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
};

export default configureStore;
