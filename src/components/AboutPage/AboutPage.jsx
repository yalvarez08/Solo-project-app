import React from 'react';
import SideNav from '../SideNav/SideNav';
import AppHeader from '../AppHeader/AppHeader';
import './AboutPage.css';


function AboutPage() {
  return (
    <>
      <div className="reminder-view">
        <SideNav />
        <div className="reminder-container">
          <AppHeader />
          <div className="reminder-title">
            <h2>About</h2>
            <h3>Casalogue is a home maintenance task management app for homeowners who need help organizing and keeping 
              track of home-related upkeep tasks. With the help of Casalogue, homeowners can maintain 
              the integrity of their property stress-free.</h3>

            <h4>Technologies:</h4>
            <ul>
              <li className="tech-li">Node</li>
              <li className="tech-li">Express</li>
              <li className="tech-li">React</li>
              <li className="tech-li">Redux</li>
              <li className="tech-li">PostgreSQL</li>
              <li className="tech-li">FullCalendar</li>
              <li className="tech-li">Semantic UI React</li>
              <li className="tech-li">SweetAlert</li>
            </ul>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default AboutPage;
