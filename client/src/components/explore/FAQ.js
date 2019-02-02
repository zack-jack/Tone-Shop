import React from 'react';
import { Container, Header, List } from 'semantic-ui-react';

const FAQ = () => {
  return (
    <Container fluid className="page-container">
      <Header as="h2">Frequently Asked Questions</Header>
      <Header subheader as="h4">
        What if I receive a defective or incorrect item?
      </Header>
      <p>
        If a product is defective upon arrival, or the wrong item was received,
        all the shipping fees will be covered by us and we will give you a
        store-credit refund on the original order. For defective items, we
        reserve the right to refuse the return if we determine the reason for
        the unit failing was not covered under the warranty (i.e., if the item
        was damaged due to user fault or error). If you feel your item was
        damaged in shipping, please take plenty of pictures of the damaged box
        and item and immediately contact us so we can open a claim with the
        shipping company.
      </p>
      <Header subheader as="h4">
        When must I ship my return?
      </Header>
      <p>
        Your return must be received by us within 45 days of the original
        purchase date for store credit, or postmarked by 14 days for a refund to
        the original purchase method. If it does not arrive within 45 days, we
        will refuse the package.
      </p>
      <Header subheader as="h4">
        When will I get my refund?
      </Header>
      <p>
        Once your return is received by us, your refund will typically be
        processed within 10-15 business days. Store credit refunds will be given
        in the form of a e-gift card which will be available for immediate use
        after it is emailed to you.
      </p>
      <Header subheader as="h4">
        What is covered by the FREE two year warranty?
      </Header>
      <Header subheader as="h5">
        What is covered:
      </Header>
      <List>
        <List.Item>
          Brand new (non-clearance) products that have been purchased within the
          last two years
        </List.Item>
        <List.Item>Products that malfunction under normal use</List.Item>
        <List.Item>Cost of repairs</List.Item>
      </List>
      <Header subheader as="h5">
        What is NOT covered:
      </Header>
      <List>
        <List.Item> Clearance products </List.Item>
        <List.Item>Products purchased more than two years ago </List.Item>
        <List.Item>Cost of shipping both ways </List.Item>
        <List.Item>
          Items with clear signs of user abuse (up to our discretion)
        </List.Item>
      </List>
    </Container>
  );
};

export default FAQ;
