import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const Returns = () => {
  return (
    <Container fluid className="page-container">
      <Header as="h2">Return Policy</Header>

      <Header subheader as="h4">
        45-Day Satisfaction Guarantee
      </Header>

      <p>
        If you are not 100% satisfied with your purchase, you can return it
        within 45 days of the original purchase date for a store credit refund,
        or within 14 days of the original purchase date for a refund to the
        original purchase method.
      </p>

      <p>
        If an item is not received by us within the 45-day window, the package
        will be refused. All new items returned must be in BRAND NEW condition
        with zero signs of wear or use and must be returned in the original
        packaging with ALL materials (free/bundled items -- must be
        unused/unopened, warranty cards, plastic, pouches, manuals etc.). We
        reserve the right to charge an up to 15% restocking fee on any opened
        items that are returned.
      </p>
    </Container>
  );
};

export default Returns;
