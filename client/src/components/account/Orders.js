import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

import requireAuth from '../auth/requireAuth';
import { getUserOrderHistory } from '../../actions/user';
import OrderHistoryTable from './OrderHistoryTable';

class Orders extends Component {
  state = {
    orders: this.props.orders
  };

  componentDidMount() {
    this.props.getUserOrderHistory();
  }

  componentDidUpdate(nextProps) {
    if (this.state.orders !== nextProps.orders) {
      this.setState({ orders: nextProps.orders });
    }
  }

  render() {
    return (
      <Container fluid className="page-container">
        <Header as="h2">Order History</Header>
        <OrderHistoryTable orders={this.state.orders} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.user.orders
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getUserOrderHistory }
  ),
  requireAuth
)(Orders);
