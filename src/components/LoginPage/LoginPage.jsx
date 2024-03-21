import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import './LoginPage.css';

function LoginPage() {
  

  return (<>
    <div className="login-container">
      <div className="block-1">
        <h2>Casalogue logo here -- login page</h2>

      </div>
      <div className="block-2">
        <div className="block-2-login">
          <LoginForm />
        </div>
          
      </div>
    </div>
  </>);
}

export default LoginPage;
