import React, {useEffect} from 'react';
import axios from 'axios';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';

function HomeDashboard() {
  const user = useSelector(store => store.user);
  const item = useSelector(store => store.item);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchHomeItems();
  }, []);
  
  const fetchHomeItems = () => {
    axios.get('/api/item')
    .then(res => {
      console.log('fetched home items:', res);
      dispatch({type: 'FETCH_ITEM', payload: res.data});
    })
    .catch(err => {
      console.log('Error fetching home items.', err);
    })
  }

  return (
    <>
    <div className="container">
      <h2>Welcome, {user.f_name}!</h2>
      <p>Your ID is: {user.id}</p>
      
    </div>
    <div>
    {item.map(entry => <li key={entry.id}>{entry.name} priority level: {entry.priority_level}</li>)}
    </div>

    <LogOutButton className="btn" />
    </>
  );
}


export default HomeDashboard;
