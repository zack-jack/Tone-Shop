import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const Contact = () => {
  return (
    <Container fluid className="page-container">
      <Header as="h2">Contact Info</Header>

      <p>
        Please feel free to contact us if you have any questions at all. All
        emails are answered within one business day. If you need immediate
        assistance during open hours, please feel free to call us toll free.
      </p>

      <p>Phone: 1-800-GET-TONE</p>
      <p>Email: sales@tone-shop.com</p>

      <Header subheader as="h4">
        Hours of Operation
      </Header>
      <p>Mon - Fri: 10 AM - 6 PM (EST)</p>
    </Container>
  );
};

export default Contact;
