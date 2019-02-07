import React from 'react';
import moment from 'moment';
import { Table } from 'semantic-ui-react';

const OrderHistoryTable = ({ orders }) => {
  const renderOrders = ordersArr =>
    ordersArr.map(order => (
      <Table.Row key={order.orderNumber}>
        <Table.Cell>#{order.orderNumber}</Table.Cell>
        <Table.Cell>
          {moment.unix(order.payment.created).format('MMM D, YYYY')}
        </Table.Cell>
        <Table.Cell>{order.payment.id ? 'Paid' : 'Unpaid'}</Table.Cell>
        <Table.Cell>{order.fulfillmentStatus}</Table.Cell>
        <Table.Cell>$ {order.total.toFixed(2)}</Table.Cell>
      </Table.Row>
    ));

  return orders && orders.length > 0 ? (
    <Table celled fixed singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Order Number</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Payment Status</Table.HeaderCell>
          <Table.HeaderCell>Fulfillment Status</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{renderOrders(orders)}</Table.Body>
    </Table>
  ) : (
    <Table celled fixed singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Orders</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>No orders have been placed.</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default OrderHistoryTable;
