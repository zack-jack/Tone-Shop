import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';

import Landing from './components/Landing';
import Layout from './components/Layout';
import RegisterLogin from './components/RegisterLogin';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Layout>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/register-login" exact component={RegisterLogin} />
          </Switch>
        </Layout>
      </MuiThemeProvider>
    );
  }
}

export default App;
