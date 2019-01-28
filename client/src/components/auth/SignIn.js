import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Form, Header, Message, Icon, Button } from 'semantic-ui-react';

import { signIn, clearAuthErrors } from '../../actions/auth';
import { setCurrentUser } from '../../actions/user';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    formData: {
      email: '',
      password: ''
    },
    errors: this.props.errors,
    isSubmitting: false
  };

  componentWillUnmount() {
    // Clears error state on navigating away
    this.props.clearAuthErrors();
  }

  componentWillReceiveProps(nextProps) {
    // Check if the component state errors array is different than the one in redux
    if (nextProps.errors !== this.state.errors) {
      // Update state with new props
      setTimeout(() => {
        this.setState({ errors: nextProps.errors });
      }, 350);
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ isSubmitting: true });

    // Take field values and pass them to form data object for redux action
    this.setState(
      {
        formData: {
          email: this.state.email,
          password: this.state.password
        }
      },
      () => {
        // Execute redux action to sign in and authenticate user
        this.props
          .signIn(this.state.formData, () => {
            this.setState({ isSubmitting: false });
          })
          .then(() => {
            // Set current user in redux
            this.props.setCurrentUser().then(() => {
              // Redirect to user account page
              this.props.history.push('/account');
            });

            setTimeout(() => {
              // If signin call returns errors, set submitting back to false
              if (this.state.errors.length > 0) {
                this.setState({ isSubmitting: false });
              }
            }, 400);
          });
      }
    );
  };

  renderErrors = errors => {
    return errors.map(error => error.message);
  };

  render() {
    const { email, password, errors, isSubmitting } = this.state;

    return (
      <>
        <Header as="h2">
          <Icon name="user outline" />
          Sign In or Create an Account
        </Header>

        <Grid columns={2} padded>
          <Grid.Column style={{ maxWidth: 600 }}>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Form.Input
                fluid
                name="email"
                type="email"
                label="Email Address"
                value={email}
                onChange={this.handleChange}
              />

              <Form.Input
                fluid
                name="password"
                type="password"
                label="Password"
                value={password}
                onChange={this.handleChange}
              />

              <Button
                className={isSubmitting ? 'loading' : ''}
                color="red"
                disabled={isSubmitting}
                size="large"
              >
                Sign In
              </Button>

              <span>New Customer?</span>
              <Link to="/signup">Sign up →</Link>
            </Form>

            {errors.length > 0 && (
              <Message error content={this.renderErrors(errors)} />
            )}
          </Grid.Column>

          <Grid.Column>
            <Header as="h3">No Account Yet?</Header>

            <Link to="/signup">
              <Button color="red" size="large">
                Sign Up Here!
              </Button>
            </Link>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.auth.errors
  };
};

export default compose(
  connect(
    mapStateToProps,
    { signIn, clearAuthErrors, setCurrentUser }
  ),
  withRouter
)(SignIn);