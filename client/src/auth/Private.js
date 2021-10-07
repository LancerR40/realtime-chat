import { BrowserRouter as Router, Route } from 'react-router-dom';
import ChatUI from '../routes/private/Chat';

const Private = () => (
  <Router>
    <Route path="/chat">
      <ChatUI />
    </Route>
  </Router>
);

export default Private;
