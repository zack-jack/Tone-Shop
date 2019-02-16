import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Grid, Header, Button } from 'semantic-ui-react';

import requireAuth from '../auth/requireAuth';
import { signOut } from '../../actions/auth';
import { setCurrentUser } from '../../actions/user';
import Loading from '../common/Loading';
import Orders from './Orders';

class Account extends Component {
  state = {
    user: this.props.user,
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    this.props.setCurrentUser().then(() => {
      this.setState({ isLoading: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user });
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      const { firstName, lastName, email } = this.state.user;

      return (
        <Container className="account">
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Header
                  as="h2"
                  content="Account Details"
                  className="account__heading"
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column tablet={16} computer={3} className="account__user">
                <Grid.Row className="account__user-name">
                  <Header as="h3">{`${firstName} ${lastName}`}</Header>
                </Grid.Row>

                <Grid.Row className="account__user-email">
                  <Header as="h4">Email Address</Header>
                  <p>{email}</p>
                </Grid.Row>

                {this.state.user.address ? (
                  <Grid.Row className="account__user-address">
                    <Header as="h4">Mailing Address</Header>
                    {this.state.user.address.address1}
                    <div>{`${this.state.user.address.city}, ${
                      this.state.user.address.state
                    } ${this.state.user.address.zipCode}`}</div>
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

              <Grid.Column tablet={16} computer={13}>
                <Grid.Row>
                  <Orders />
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      );
    }
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
