import React from 'react';
import { Link } from 'react-router-dom';
import Reminders from '../Reminders/Reminders';
import Calendar from '../Calendar/Calendar';
import './SideNav.css';


function SideNav() {

    const sideNavContent = [

            {
                title: "Dashboard",
                link:"/user"
            },
            {
                title: "Calendar",
                link:"/calendar"
            },
            {
                title: "Reminders",
                link:"/reminders"
            }
    ]
    
    return (
        <>
        <div className="side-nav">
        <Link className="link-title" to="/user">
            <h2>Dashboard</h2>
        </Link>
        <Link className="link-title" to="/calendar">
            <h2>Calendar</h2>
        </Link>
        <Link className="link-title" to="/reminders">
            <h2>Reminders</h2>
        </Link>
            {/* <ul>
            {sideNavContent.map((val, key) => {
                return (
                    <li key={key} 
                    onClick={() => {window.location.pathname = val.link}}> 
                    <div>{val.title}</div>
                    </li>
                )
            })}
            </ul> */}
        </div>
        </>
    )
}

export default SideNav