import React from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import './RegisterPage.css';

function RegisterPage() {

  return (<>
    <div className="register-container">
      <div className="block-1">
      <img className="logo-img-2" src={"/Casalogue Home Logo.png"} />

      </div>
      <div className="block-2">
        <div className="block-2-register">
      <RegisterForm />

        
        </div>
      </div>
    </div>
    </>);
}

export default RegisterPage;
