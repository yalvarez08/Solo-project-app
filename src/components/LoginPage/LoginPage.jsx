import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import './LoginPage.css';


function LoginPage() {
  

  return (<>
    <div className="login-container">
      <div className="block-1">
        <img className="logo-img" src={"/Casalogue Home Logo.png"} />

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
