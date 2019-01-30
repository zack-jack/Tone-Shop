import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Grid, Header, Table, Button } from 'semantic-ui-react';

import requireAuth from '../auth/requireAuth';
import { signOut } from '../../actions/auth';
import { setCurrentUser } from '../../actions/user';

class Account extends Component {
  state = {
    user: this.props.user
  };

  componentDidMount() {
    this.props.setCurrentUser();
  }

  render() {
    const { firstName, lastName, email } = this.state.user;

    return (
      <Container className="account">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" content="Account Details" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={3}>
              <Grid.Row className="account__user-name">
                <Header as="h3" dividing>
                  {`${firstName} ${lastName}`}
                </Header>
              </Grid.Row>

              <Grid.Row className="account__user-email">
                <Header as="h4">Email Address</Header>
                {email}
              </Grid.Row>

              {this.state.user.address ? (
                <Grid.Row>
                  <Header as="h4">Primary Mailing Address</Header>
                  {this.state.user.address}
                </Grid.Row>
              ) : null}

              <div className="account__actions">
                <Button
                  basic
                  compact
                  size="small"
                  className="account__edit-button"
                  onClick={() => this.props.history.push('/edit/account')}
                >
                  {this.state.user.address
                    ? 'Edit Account'
                    : 'Add Mailing Address'}
                </Button>

                <Button
                  compact
                  color="red"
                  size="small"
                  onClick={this.props.signOut}
                >
                  Sign Out
                </Button>
              </div>
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

const mapStateToProps = state => {
  return {
    user: state.user.data
  };
};

export default compose(
  connect(
    mapStateToProps,
    { signOut, setCurrentUser }
  ),
  withRouter,
  requireAuth
)(Account);
