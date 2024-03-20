import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HashRouter as Router, Route, Link} from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import './SideNav.css';


function SideNav() {

    const dispatch = useDispatch();
    const history = useHistory();

    return (<>
        <div className='sidenav'>
            <div className='top'>
                <span className='logo'>Casalogue</span>
            </div>
            <hr />
            <div className='center'>
                <ul>
                    <li onClick={() => history.push('/dashboard')}>
                        <Icon name='dashboard' size='large' /> 
                            <span>Dashboard</span>
                    </li>
                    <li onClick={() => history.push('/calendar')}>
                        <Icon name='calendar alternate' size='large' />
                        <span>Calendar</span>
                    </li>
                    <li onClick={() => history.push('/reminders')}>
                        <Icon name='bell outline' size='large' />
                        <span>Reminders</span>
                    </li>
                    <li>
                        <Icon name='log out' size='large' />
                        <span onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</span>
                    </li>
                </ul>
                </div>
            
        </div>
    </>)
}

export default SideNav