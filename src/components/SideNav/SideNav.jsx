import React from 'react';
import { HashRouter as Router, Route, Link} from 'react-router-dom';
import {
    SidebarPusher,
    SidebarPushable,
    MenuItem,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
  } from 'semantic-ui-react';
import './SideNav.css';


function SideNav() {

    return (<>
        <div className='sidenav'>
            <div className='top'>
                <span className='logo'>Casalogue</span>
            </div>
            <div className='center'>
                <ul>
                    <li>
                        <span>Dashboard</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>Calendar</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>Reminders</span>
                    </li>
                </ul>
                </div>
            <div className='bottom'>color options</div>
        </div>
    </>)
}

export default SideNav