import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import AppHeader from '../AppHeader/AppHeader';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import HomeDashboard from '../HomeDashboard/HomeDashboard';
import ItemDetails from '../ItemDetails/ItemDetails';
import AddHomeItem from '../AddHomeItem/AddHomeItem';
import EditHomeItem from '../EditHomeItem/EditHomeItem';
import Reminders from '../Reminders/Reminders';
import Calendar from '../Calendar/Calendar';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/dashboard */}
          <Redirect exact from="/" to="/dashboard" />

          <Route
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows HomeDashboard else shows LoginPage
            exact
            path="/dashboard"
          >
            <HomeDashboard />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/item-details/:id"
          >
            <ItemDetails />
          </ProtectedRoute>
          
          <ProtectedRoute
            exact
            path="/add-item">
              <AddHomeItem />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              <Redirect to="/dashboard" />
              :
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              <Redirect to="/dashboard" />
              :
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              <Redirect to="/dashboard" />
              :
              <LandingPage />
            }
          </Route>

          <ProtectedRoute
          exact 
          path="/edit-item/:id">
            <EditHomeItem />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/calendar">
              <Calendar />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/reminders">
              <Reminders />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
