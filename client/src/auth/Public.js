import Home from '../routes/home/Home';
import Signup from '../routes/signup/Signup';
import Login from '../routes/login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Public = () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  </Router>
);

export default Public;
