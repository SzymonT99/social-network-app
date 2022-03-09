import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import MainApplication from './MainApplication';
import Notification from '../components/Notification/Notification';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/app" component={MainApplication} />
        <Route exact component={Auth} />
      </Switch>
      <Notification />
    </BrowserRouter>
  );
};

export default App;
