import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import { GridColumn, Grid, Image, Segment } from 'semantic-ui-react';
import './Reminders.css';

function Reminders() {
  const reminder = useSelector(store => store.reminder);
  const dispatch = useDispatch();

  // on load, fetch and render all user's reminders from db
  useEffect(() => {
    dispatch({ type: 'FETCH_REMINDER' });
  }, []);

  const renderReminders = () => {
    if(reminder.length > 0) {
      return(<>
      <h3>You currently have {reminder.length} reminders.</h3>
            <Grid stackable columns={3} padded>
                {reminder.map(rem =>
                  <GridColumn key={rem.id}>
                    <Segment>
                    <h4>name: {rem.name}</h4>
                    location:{rem.location} frequency:{rem.frequency} next date:{rem.next_date} 
                    notes:{rem.description_notes}</Segment>
                    </GridColumn>
                )}
              </Grid>
        </>)
    } else {
      return(<>
        <h2>Oh no! Looks like you don't have any reminders.</h2>
      </>)
    }
  }

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
            {renderReminders()}
          </div>
        </div>
      </div>
    </>)

}

export default Reminders

