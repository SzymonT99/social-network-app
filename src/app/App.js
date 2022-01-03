import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import MainApplication from './MainApplication';
import Copyright from '../components/Copyright/Copyright';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Auth} />
        <Route exact path="/app" component={MainApplication} />
      </Switch>
      <Copyright />
    </BrowserRouter>
  );
};

export default App;
