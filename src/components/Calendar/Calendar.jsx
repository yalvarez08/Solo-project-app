import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import './Calendar.css';

function Calendar() {

    return (
    <>
    <div className="calendar-view">
      <SideNav />
        <div className="calendar-container">
          <AppHeader />
          <div className="calendar-title">
            <h2>Calendar</h2>
          </div>
            <div className="calendar-content">
                <h3>This is the Calendar page.</h3>
                <h4>**Under construction**</h4>
            </div>
        </div>
    </div>
    </>)

}

export default Calendar