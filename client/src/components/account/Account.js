import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Grid, Header, Table, Button, Tab } from 'semantic-ui-react';

import requireAuth from '../auth/requireAuth';
import { signOut } from '../../actions/auth';

class Account extends Component {
  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" content="Account Details" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>
              <Grid.Row>
                <Header as="h3" dividing>
                  User Name
                </Header>
              </Grid.Row>

              <Grid.Row>
                <Header as="h4">Email Address</Header>
                User's Email Address
              </Grid.Row>

              <Grid.Row>
                <Header as="h4">Primary Mailing Address</Header>
                User's Mailing Address
              </Grid.Row>

              <Button
                compact
                color="red"
                size="small"
                onClick={this.props.signOut}
              >
                Sign Out
              </Button>
            </Grid.Column>

            <Grid.Column width={13}>
              <Grid.Row>
                <Header as="h3" dividing>
                  Order History
                </Header>

                <Table celled fixed singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Order</Table.HeaderCell>
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
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default compose(
  connect(
    null,
    { signOut }
  ),
  withRouter,
  requireAuth
)(Account);
