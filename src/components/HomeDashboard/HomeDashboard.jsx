import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function HomeDashboard() {
  const user = useSelector(store => store.user);
  const item = useSelector(store => store.item);
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

  // const markItemComplete = () => {

  // }

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
    <div className="container">
      <h2>Welcome, {user.f_name}!</h2>
      <p>Your ID is: {user.id}</p>
      
    </div>
    <h3>Your Active Home Items</h3>
    <div> 
      { toggleManageBtn ? renderHomeItems() : <>
        {item.map(entry => {
        return(
          <div key={entry.id}>
            <li key={entry.id}> <img width={50} height={50} src={"/home-placeholder.jpeg"} onClick={() => history.push(`/item-details/${entry.id}`)}/>{entry.name} priority level: {entry.priority_level}
            <button>☑️</button> 
            {entry.user_id === user.id && <button onClick={() => deleteHomeItem(entry.id, entry.user_id)}>❌</button>}
            </li>
          </div>
        );
      })}
      </>} 
    </div>
    <div>
      <button className="btn" onClick={() => history.push('/add-item')}>Add Home Item</button>
      <button className="btn" onClick={() => setToggleManageBtn(!toggleManageBtn)}>Manage Items</button>
    </div>
    </>
  );
}


export default HomeDashboard;
