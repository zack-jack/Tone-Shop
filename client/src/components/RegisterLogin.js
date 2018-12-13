import React from 'react';
import Button from '@material-ui/core/Button';

const RegisterLogin = () => {
  return (
    <div>
      <div>
        <div>Register</div>
        <Button variant="contained">Register</Button>
      </div>

      <div>
        <div>Login</div>
        <Button variant="contained">Login</Button>
      </div>
    </div>
  );
};

export default RegisterLogin;
