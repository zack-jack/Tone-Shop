import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Header, Button } from 'semantic-ui-react';

const Thanks = () => {
  return (
    <Container fluid className="thanks">
      <Header as="h2">Thanks for placing your order!</Header>
      <p>We are working swiftly to process and ship your order.</p>
      <p>You can view the order from your account overview page.</p>
      <Button as={Link} color="red" to="/account">
        Go To My Account
      </Button>
    </Container>
  );
};

export default withRouter(Thanks);
