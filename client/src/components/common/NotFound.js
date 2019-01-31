import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Button } from 'semantic-ui-react';

const NotFound = () => {
  return (
    <Container centered textAlign="center" className="not-found">
      <Header as="h2">Page Not Found</Header>
      <Link to="/">
        <Button color="red">Back to Home Page</Button>
      </Link>
    </Container>
  );
};

export default NotFound;
