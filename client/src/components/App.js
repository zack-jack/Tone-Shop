import React, { Component } from 'react';

import Header from './layout/Header';
import Footer from './layout/Footer';
import ProductHeader from './layout/ProductHeader';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <ProductHeader />
        {this.props.children}
        <Footer />
      </>
    );
  }
}

export default App;
