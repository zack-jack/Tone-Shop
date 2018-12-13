import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './components/Landing';
import Layout from './components/Layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Landing} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
