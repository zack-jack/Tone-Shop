import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Semantic UI styles
import 'semantic-ui-css/semantic.min.css';

import App from './components/App';
import Landing from './components/Landing';

ReactDOM.render(
  <Router>
    <App>
      <Route path="/" exact component={Landing} />
    </App>
  </Router>,
  document.getElementById('root')
);
