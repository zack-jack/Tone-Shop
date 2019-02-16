import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Header, Button } from 'semantic-ui-react';

const Thanks = props => {
  const handleOnClick = () => {
    props.history.push('/account');
  };

  return (
    <Container fluid className="thanks">
      <Header as="h2">Thanks for placing your order!</Header>
      <p>We are working swiftly to process and ship your order.</p>
      <p>You can view the order from your account overview page.</p>
      <Button color="red" onClick={handleOnClick}>
        Go To My Account
      </Button>
    </Container>
  );
};

export default withRouter(Thanks);
