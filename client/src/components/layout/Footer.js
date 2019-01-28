import React from 'react';
import { Container, Grid, Header, List, Icon } from 'semantic-ui-react';

const Footer = () => (
  <>
    <Container>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header as="h4" content="Shop" />
            <List link>
              <List.Item as="a">All Guitars</List.Item>
              <List.Item as="a">Best Sellers</List.Item>
              <List.Item as="a">Newest Items</List.Item>
              <List.Item as="a">Brands</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header as="h4" content="Explore" />
            <List link>
              <List.Item as="a">About Us</List.Item>
              <List.Item as="a">Contact Info</List.Item>
              <List.Item as="a">FAQ</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header as="h4" content="Account" />
            <List link>
              <List.Item as="a">My Account</List.Item>
              <List.Item as="a">Track an Order</List.Item>
              <List.Item as="a">Returns</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4" content="Connect with us" />
            <Grid.Row>
              <List link>
                <List.Item as="a">
                  <Icon name="facebook f" size="large" />
                </List.Item>
                <List.Item as="a">
                  <Icon name="twitter" size="large" />
                </List.Item>
                <List.Item as="a">
                  <Icon name="instagram" size="large" />
                </List.Item>
                <List.Item as="a">
                  <Icon name="youtube" size="large" />
                </List.Item>
              </List>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>

    <Container>&copy; {new Date().getFullYear()} | Tone Shop</Container>
  </>
);

export default Footer;
