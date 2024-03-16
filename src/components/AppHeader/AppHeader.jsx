import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import './AppHeader.css';
import { useSelector } from 'react-redux';

function AppHeader() {
  const user = useSelector((store) => store.user);

  return (
    <>
     <div className='app-header'>
      <div className='wrapper'>
        
          <div className='wrapper-icons'>
          {/* If no user is logged in, show these links */}
          {!user.id && (
          // If there's no user, show login/registration links
            <Link className="navLink" to="/login">
              Login / Register
            </Link>
          )}
          </div>
          <div className='wrapper-icons'>
          {/* If a user is logged in, show these links */}
          {user.id && (
            <Link className="navLink" to="/dashboard">
              Home
            </Link>    
          )}
          </div>
          <div className='wrapper-icons'>
            <Link className="navLink" to="/about">
              About
            </Link>
          </div>
          <div className='wrapper-icons'>
            <Icon name='user circle outline' size='large' />
          </div>
      </div>
      
    </div>
    </>
  );
}

export default AppHeader;
