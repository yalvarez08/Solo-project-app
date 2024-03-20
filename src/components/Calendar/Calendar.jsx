import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

function Calendar() {
  const reminder = useSelector(store => store.reminder);
  const dispatch = useDispatch();


  // on load, fetch user's reminders so page has info to populate calendar
  useEffect(() => {
    dispatch({ type: 'FETCH_REMINDER' });
  }, []);

  const renderReminders = () => {
    return(
      reminder.map(rem => {
        const {title, start, end} = rem
        
        return{
          title: rem.name,
          start: rem.next_date,
          end,
          extendedProps: {...rem}
        }
      })
    )
  }

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
                <Fullcalendar
            
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={renderReminders()}
                height={"60vh"}
            
                />
            </div>
        </div>
    </div>
    </>)

}

export default Calendar