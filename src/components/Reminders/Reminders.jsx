import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import './Reminders.css';

function Reminders() {
  const reminder = useSelector(store => store.reminder);
  const dispatch = useDispatch();

  // on load, fetch and render all user's reminders from db
  useEffect(() => {
    dispatch({ type: 'FETCH_REMINDER' });
  }, []);

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
            <>
              <ul>
                {reminder.map(rem =>
                  <li key={rem.id}>
                    <h4>name: {rem.name}</h4>
                    location:{rem.location} frequency:{rem.frequency} next date:{rem.next_date} notes:{rem.description_notes}</li>
                )}
              </ul>
            </>
          </div>
        </div>
      </div>
    </>)

}

export default Reminders