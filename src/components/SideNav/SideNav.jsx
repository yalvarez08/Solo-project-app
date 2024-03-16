import React from 'react';
import { HashRouter as Router, Route, Link} from 'react-router-dom';
import { Icon, IconGroup} from 'semantic-ui-react';
import './SideNav.css';


function SideNav() {

    return (<>
        <div className='sidenav'>
            <div className='top'>
                <span className='logo'>Casalogue</span>
            </div>
            <hr />
            <div className='center'>
                <ul>
                    <li>
                        <Icon name='dashboard' size='large' /> 
                        <span>Dashboard</span>
                    </li>
                    <li>
                        <Icon name='calendar alternate' size='large' />
                        <span>Calendar</span>
                    </li>
                    <li>
                        <Icon name='bell outline' size='large' />
                        <span>Reminders</span>
                    </li>
                    <li>
                        <Icon name='log out' size='large' />
                        <span>Logout</span>
                    </li>
                </ul>
                </div>
            <div className='bottom'>
                <div className='themeOption'></div>
                <div className='themeOption'></div>
            </div>
        </div>
    </>)
}

export default SideNav