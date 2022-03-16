import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import ChatUI from '../routes/private/Chat'

import { useSelector } from 'react-redux'

const ToChatPage = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)

  return isAuth === true && <Redirect to="/chat" />
}

const Private = () => (
  <Router>
    <Route path="/chat">
      <ChatUI />
    </Route>

    <Route path="*">
      <ToChatPage />
    </Route>
  </Router>
)

export default Private
