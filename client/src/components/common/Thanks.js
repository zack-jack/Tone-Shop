import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Header, Button } from 'semantic-ui-react';

const Thanks = props => {
  const handleOnClick = () => {
    props.history.push('/');
  };

  return (
    <Container fluid className="thanks">
      <Header as="h2">Thanks for placing your order!</Header>
      <p>We are working swiftly to process and ship your order.</p>

      <Button color="red" onClick={handleOnClick}>
        Go back to the homepage
      </Button>
    </Container>
  );
};

export default withRouter(Thanks);
