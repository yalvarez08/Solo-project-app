import React, {useEffect} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function HomeDashboard() {
  const user = useSelector(store => store.user);
  const item = useSelector(store => store.item);
  const dispatch = useDispatch();
  const history = useHistory();

// on load, fetch and render all user's home items from db
  useEffect(() => {
    dispatch({type: 'FETCH_ITEM'});
  }, []);
  

  return (
    <>
    <div className="container">
      <h2>Welcome, {user.f_name}!</h2>
      <p>Your ID is: {user.id}</p>
      
    </div>
    <h3>Your Active Home Items</h3>
    <div>
    {item.map(entry => {
      return(
        <div key={entry.id}>
          <li key={entry.id}> <img width={50} height={50} src={"/home-placeholder.jpeg"} onClick={() => history.push(`/item-details/${entry.id}`)}/>{entry.name} priority level: {entry.priority_level}</li>
        </div>
      );
    })}
    </div>
    </>
  );
}


export default HomeDashboard;
