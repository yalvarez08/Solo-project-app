import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import './Reminders.css';

function Reminders() {

    return (
    <>
    <div className="reminder-view">
      <SideNav />
        <div className="reminder-container">
          <AppHeader />
          <div className="reminder-title">
            <h2>Reminders</h2>
          </div>
          <div className="reminder-content">
            <h3>This is the Reminders page.</h3>
            <h4>**Under construction**</h4>
         </div>
        </div>
    </div>
    </>)

}

export default Reminders