import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

import requireAuth from '../auth/requireAuth';
import OrderHistoryTable from './OrderHistoryTable';

class Orders extends Component {
  render() {
    return (
      <Container fluid className="page-container">
        <Header as="h2">Order History</Header>
        <OrderHistoryTable />
      </Container>
    );
  }
}

export default requireAuth(Orders);
