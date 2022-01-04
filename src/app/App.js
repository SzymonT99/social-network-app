import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import MainApplication from './MainApplication';
import Copyright from '../components/Copyright/Copyright';
import Notification from '../components/Notification/Notification';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Auth} />
        <Route exact path="/app" component={MainApplication} />
      </Switch>
      <Copyright />
      <Notification />
    </BrowserRouter>
  );
};

export default App;
