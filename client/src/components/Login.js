import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import FormField from './FormField';

import { loginUser } from '../actions/userActions';

import getFormData from '../utils/forms/getFormData';
import validateForm from '../utils/forms/validateForm';
import updateField from '../utils/forms/updateField';
import isEmpty from '../utils/forms/isEmpty';

class Login extends Component {
  state = {
    formSuccess: '',
    formError: false,
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'emailInput',
          type: 'email',
          placeholder: 'Enter your email address'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'passwordInput',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  updateForm = element => {
    const newFormData = updateField(element, this.state.formData, 'login');

    this.setState({
      formData: newFormData
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const dataToSubmit = getFormData(this.state.formData, 'login');
    const formIsEmpty = isEmpty(this.state.formData, 'login');
    const formIsValid = validateForm(this.state.formData, 'login');

    if (!formIsEmpty || formIsValid) {
      this.setState({
        formError: false
      });

      this.props.dispatch(loginUser(dataToSubmit)).then(res => {
        console.log(res.payload);
        if (res.payload.success) {
          console.log(res.payload);
          this.props.history.push('/user/dashboard');
        } else {
          this.setState({
            formError: true
          });
        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  render() {
    const { formError } = this.state;
    return (
      <div>
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <FormField
            id={'email'}
            formData={this.state.formData.email}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={'password'}
            formData={this.state.formData.password}
            change={element => this.updateForm(element)}
          />
          {formError ? (
            <div>Please check that the data entered is valid.</div>
          ) : null}
          <Button variant="contained" onClick={e => this.handleFormSubmit(e)}>
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(Login));
