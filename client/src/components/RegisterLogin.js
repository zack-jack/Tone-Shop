import React from 'react';

import Login from './Login';
import Register from './Register';

const RegisterLogin = () => {
  return (
    <div>
      <div>
        <div>Register</div>
        <Register />
      </div>

      <div>
        <div>Login</div>
        <Login />
      </div>
    </div>
  );
};

export default RegisterLogin;
