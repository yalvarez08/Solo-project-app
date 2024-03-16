import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SideNav from '../SideNav/SideNav';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './HomeDashboard.css';

function HomeDashboard() {
  const user = useSelector(store => store.user);
  const item = useSelector(store => store.item);
  const updateItem = useSelector(store => store.updateItem);

  const [toggleManageBtn, setToggleManageBtn] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

// on load, fetch and render all user's home items from db
  useEffect(() => {
    dispatch({type: 'FETCH_ITEM'});
  }, []);
  
  const deleteHomeItem = (id, user_id) => {
    dispatch({type: 'DELETE_ITEM', payload: {id, user_id}});
    alert(`Item with id ${id} was successfully deleted.`)
  }
  
  const markItemComplete = (id) => { //👈bug here: still needs work 
    console.log('item is:', item);
    
    axios.put(`/api/item/complete/${item.id}`, item)
    .then(res => {
      // console.log('updateItem:', updateItem);
      alert(`Item with id ${id} was updated to "complete".`)
      dispatch({type: 'SET_UPDATE', payload: updateItem});
    })
    .catch(err => {
      alert(`Oops, Item with id ${id} failed to update.`);
      console.log('Error on is_complete PUT:', err);
    })
  }

  const renderHomeItems = () => {
    return (<>
      {item.map(entry => {
      return(
        <div key={entry.id}>
          <li key={entry.id}> <img width={50} height={50} src={"/home-placeholder.jpeg"} onClick={() => history.push(`/item-details/${entry.id}`)}/>{entry.name} priority level: {entry.priority_level}
          </li>
        </div>
      );
      })}
    </>)
  };
  
  return (
    <>
    <div className="dashboard">
      <SideNav />
      <div className="home-container">
      <h2>Welcome, {user.f_name}!</h2>
      <p>Your ID is: {user.id}</p>
      
    
    <h3>Your Active Home Items</h3>
      <div> 
      { toggleManageBtn ? renderHomeItems() : <>
        {item.map(entry => {
        return(
          <div key={entry.id}>
            <li key={entry.id}> <img width={50} height={50} src={"/home-placeholder.jpeg"} onClick={() => history.push(`/item-details/${entry.id}`)}/>{entry.name} priority level: {entry.priority_level}
            {entry.user_id === user.id && <button onClick={() => markItemComplete(entry.id, entry.user_id)}>☑️</button> }
            {entry.user_id === user.id && <button onClick={() => deleteHomeItem(entry.id, entry.user_id)}>❌</button>}
            </li>
          </div>
        );
      })}
      </>} 
      </div>
      <div>
        <Button primary onClick={() => history.push('/add-item')}>Add Home Item</Button>
        <Button secondary onClick={() => setToggleManageBtn(!toggleManageBtn)}>Manage Items</Button>
      </div>
      </div>
    </div>
    </>
  );
}


export default HomeDashboard;
