import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Semantic UI styles
import 'semantic-ui-css/semantic.min.css';

// SASS styles
import './styles/styles.scss';

import App from './components/App';
import Landing from './components/landing/Landing';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Loading from './components/common/Loading';
import Account from './components/account/Account';
import EditAccount from './components/account/EditAccount';
import BrowseProducts from './components/product/browse/BrowseProducts';
import NotFound from './components/common/NotFound';

import { store, persistor } from './store/configureStore';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Router>
        <App>
          <Switch>
            <Route path="/" exact render={() => <Landing />} />
            <Route path="/signup" render={() => <SignUp />} />
            <Route path="/signin" render={() => <SignIn />} />
            <Route path="/account" render={() => <Account />} />
            <Route path="/edit/account" render={() => <EditAccount />} />
            <Route path="/browse" render={() => <BrowseProducts />} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
