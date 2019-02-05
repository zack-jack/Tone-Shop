import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Form, Header, Message, Button } from 'semantic-ui-react';

import { updateUserAddress } from '../../actions/user';

class EditAccount extends Component {
  state = {
    currentUser: this.props.currentUser,
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    formData: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: ''
    },
    isSubmitting: false,
    statusMessage: ''
  };

  componentDidMount() {
    this.setState({ currentUser: this.props.currentUser });

    // Reset redux props for address form
    this.props.updateUserAddress(this.state.currentUser._id, {});
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
          address1: this.state.address1,
          address2: this.state.address2,
          city: this.state.city,
          state: this.state.state,
          zipCode: this.state.zipCode
        }
      },
      () => {
        // Execute redux action to sign in and authenticate user
        this.props
          .updateUserAddress(this.state.currentUser._id, this.state.formData)
          .then(json => {
            this.setState({ isSubmitting: false });

            // Error message received
            if (json.hasOwnProperty('response')) {
              this.setState({ statusMessage: json.response.data });
            }

            // Success message received
            if (json.hasOwnProperty('data')) {
              this.setState({ statusMessage: json.data });

              setTimeout(() => {
                // Redirect to user account page
                this.props.history.push('/account');
              }, 2000);
            }
          })
          .catch(err => {
            console.log(err);

            this.setState({ isSubmitting: false });
          });
      }
    );
  };

  renderMessage = () => {
    if (this.state.statusMessage && this.state.statusMessage.type === 'error') {
      return <Message error content={this.state.statusMessage.message} />;
    }

    if (
      this.state.statusMessage &&
      this.state.statusMessage.type === 'success'
    ) {
      return <Message success content={this.state.statusMessage.message} />;
    }
  };

  render() {
    const {
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zipCode,
      isSubmitting
    } = this.state;

    return (
      <Grid columns={2} padded>
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header as="h2">Edit Account</Header>
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
              name="address1"
              type="text"
              label="Address Line 1"
              value={address1}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              name="address2"
              type="text"
              label="Address Line 2"
              value={address2}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              name="city"
              type="text"
              label="City"
              value={city}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              name="state"
              type="text"
              label="State"
              value={state}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              name="zipCode"
              type="number"
              label="Zip Code"
              value={zipCode}
              onChange={this.handleChange}
            />

            <Button
              className={isSubmitting ? 'loading' : ''}
              color="red"
              disabled={isSubmitting}
              size="large"
            >
              {this.state.currentUser !== null && this.state.currentUser.address
                ? 'Update Address'
                : 'Add Address'}
            </Button>

            <Button
              size="large"
              onClick={() => this.props.history.push('/account')}
            >
              Cancel
            </Button>
          </Form>

          {this.renderMessage()}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.data
  };
};

export default compose(
  connect(
    mapStateToProps,
    { updateUserAddress }
  ),
  withRouter
)(EditAccount);
