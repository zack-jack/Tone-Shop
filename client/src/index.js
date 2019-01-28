import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Semantic UI styles
import 'semantic-ui-css/semantic.min.css';

import App from './components/App';
import Landing from './components/Landing';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';

import { store } from './store/configureStore';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route path="/" exact component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" render={() => <SignIn />} />
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);
