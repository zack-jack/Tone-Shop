import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Semantic UI styles
import 'semantic-ui-css/semantic.min.css';

import App from './components/App';
import Landing from './components/Landing';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Loading from './components/common/Loading';
import Account from './components/account/Account';

import { store, persistor } from './store/configureStore';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Router>
        <App>
          <Route path="/" exact render={() => <Landing />} />
          <Route path="/signup" render={() => <SignUp />} />
          <Route path="/signin" render={() => <SignIn />} />
          <Route path="/account" render={() => <Account />} />
        </App>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
