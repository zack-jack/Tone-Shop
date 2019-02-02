import React from 'react';
import { Table } from 'semantic-ui-react';

const OrderHistoryTable = () => (
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

    <Table.Body>
      <Table.Row>
        <Table.Cell>#10097171</Table.Cell>
        <Table.Cell>October 26, 2018</Table.Cell>
        <Table.Cell>Paid</Table.Cell>
        <Table.Cell>Fulfilled</Table.Cell>
        <Table.Cell>$1,282.94</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default OrderHistoryTable;
