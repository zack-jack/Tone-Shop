import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

import requireAuth from '../auth/requireAuth';
import { getUserOrderHistory } from '../../actions/user';
import OrderHistoryTable from './OrderHistoryTable';

class Orders extends Component {
  state = {
    orders: this.props.orders,
    user: this.props.user
  };

  componentDidMount() {
    this.props.getUserOrderHistory();
  }

  componentDidUpdate(nextProps) {
    if (
      this.state.orders !== nextProps.orders &&
      nextProps.orders !== undefined
    ) {
      this.setState({ orders: nextProps.orders });
    }

    if (
      this.state.orders &&
      this.state.user.data.orderHistory.length !== this.state.orders.length
    ) {
      this.setState({ orders: this.state.user.data.orderHistory });
    }

    if (this.state.orders === undefined && this.state.user.data.orderHistory) {
      this.setState({ orders: this.state.user.data.orderHistory });
    }
  }

  render() {
    return (
      <Container fluid className="account__orders">
        <Header as="h2" className="account__orders-heading">
          Order History
        </Header>
        <OrderHistoryTable orders={this.state.orders} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.user.orders,
    user: state.user
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getUserOrderHistory }
  ),
  requireAuth
)(Orders);
