import React, { Component } from 'react';

import Header from './layout/Header';
import Footer from './layout/Footer';
import ProductHeader from './layout/ProductHeader';

class App extends Component {
  render() {
    return (
      <>
        <div className="header">
          <Header />
          <ProductHeader className="product-header" />
        </div>
        {this.props.children}
        <Footer />
      </>
    );
  }
}

export default App;
