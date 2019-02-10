import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  Container,
  Grid,
  Form,
  Header,
  Message,
  Icon,
  Button
} from 'semantic-ui-react';

import { signUp, clearAuthErrors } from '../../actions/auth';
import { setCurrentUser } from '../../actions/user';

class SignUp extends Component {
  state = {
    cart: this.props.cart,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: ''
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
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          passwordConfirm: this.state.passwordConfirm
        }
      },
      () => {
        // Clear errors state
        this.props.clearAuthErrors();

        // Execute redux action to sign in and authenticate user
        this.props
          .signUp(this.state.formData, () => {
            this.setState({ isSubmitting: false });
          })
          .then(() => {
            // Set current user in redux
            this.props.setCurrentUser().then(() => {
              if (this.state.cart.length > 0) {
                // Redirect user to shopping cart
                this.props.history.push('/cart');
              } else {
                // Redirect to user account page
                this.props.history.push('/account');
              }
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
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      errors,
      isSubmitting
    } = this.state;

    return (
      <Container className="signup">
        <Header as="h2" className="signup__heading">
          <Icon name="user outline" />
          Create an Account
        </Header>

        <Grid columns={2} padded stackable>
          <Grid.Column tablet={16} computer={8}>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Form.Input
                fluid
                name="firstName"
                type="text"
                label="First Name"
                value={firstName}
                onChange={this.handleChange}
              />

              <Form.Input
                fluid
                name="lastName"
                type="text"
                label="Last Name"
                value={lastName}
                onChange={this.handleChange}
              />

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

              <Form.Input
                fluid
                name="passwordConfirm"
                type="password"
                label="Confirm Password"
                value={passwordConfirm}
                onChange={this.handleChange}
              />

              <div className="signup__action">
                <Button
                  className={isSubmitting ? 'loading' : ''}
                  color="red"
                  disabled={isSubmitting}
                  size="large"
                >
                  Sign Up
                </Button>

                <div>
                  Already Have an Account?
                  <Link to="/signin" className="link signup__signin-arrow-link">
                    <Button basic>Sign in →</Button>
                  </Link>
                </div>
              </div>
            </Form>

            {errors.length > 0 && (
              <Message error content={this.renderErrors(errors)} />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.user.cart,
    errors: state.auth.errors
  };
};

export default compose(
  connect(
    mapStateToProps,
    { signUp, clearAuthErrors, setCurrentUser }
  ),
  withRouter
)(SignUp);
