import React from 'react';

import Header from './layout/Header';
import Footer from './layout/Footer';

const App = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default App;
