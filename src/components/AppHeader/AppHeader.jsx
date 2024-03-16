import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './AppHeader.css';
import { useSelector } from 'react-redux';
import {Segment, Header} from 'semantic-ui-react';

function AppHeader() {
  const user = useSelector((store) => store.user);

  return (
    <Segment basic inverted padded='very'>
      <Link to="/home">
        <Header size='huge' floated='left' color='grey' >Casalogue</Header>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/dashboard">
              Home
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </Segment>
  );
}

export default AppHeader;
