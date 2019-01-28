import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      if (!this.props.isAuth) {
        this.authFailedRedirect();
      }
    }

    componentDidUpdate() {
      if (!this.props.isAuth) {
        this.authFailedRedirect();
      }
    }

    authFailedRedirect = () => {
      this.props.history.push('/signin');
    };

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return { isAuth: state.auth.authenticated };
  };

  return compose(
    connect(mapStateToProps),
    withRouter
  )(ComposedComponent);
};
