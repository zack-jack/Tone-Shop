import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Form, Header, Button } from 'semantic-ui-react';

class EditAccount extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: ''
    },
    isSubmitting: false
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
              Update Address
            </Button>

            <Button
              size="large"
              onClick={() => this.props.history.push('/account')}
            >
              Cancel
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(EditAccount);
