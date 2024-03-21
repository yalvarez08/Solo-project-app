import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FaHouseUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
  
    <form className="login-wrapper" onSubmit={login}>
      <h2>Welcome back!</h2>
      <h4>Please login to your account</h4>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div className="input-box">
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <FaHouseUser className="log-icon"/>
        </label>
      </div>
      <div className="input-box">
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <RiLockPasswordFill className="log-icon"/>
        </label>
        </div>
        <div className="btn-box">
          <button className="login-btn" type="submit" name="submit">Log In</button>
        </div>
        <div className="register-span">
        <span>Don't have an account? </span>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </button>
          </div>
      
    </form>
    
  );
}

export default LoginForm;
