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
import Cart from './components/cart/Cart';
import Checkout from './components/cart/Checkout';
import Thanks from './components/common/Thanks';
import BrowseProducts from './components/product/browse/BrowseProducts';
import Product from './components/product/Product';
import About from './components/explore/About';
import Contact from './components/explore/Contact';
import FAQ from './components/explore/FAQ';
import Orders from './components/account/Orders';
import Returns from './components/account/Returns';
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
            <Route path="/cart" render={() => <Cart />} />
            <Route path="/checkout" render={() => <Checkout />} />
            <Route path="/:id/thanks" render={() => <Thanks />} />
            <Route path="/orders" render={() => <Orders />} />
            <Route path="/returns" render={() => <Returns />} />
            <Route path="/edit/account" render={() => <EditAccount />} />
            <Route path="/browse" render={() => <BrowseProducts />} />
            <Route path="/product" render={() => <Product />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/contact" render={() => <Contact />} />
            <Route path="/faq" render={() => <FAQ />} />

            <Route component={NotFound} />
          </Switch>
        </App>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
