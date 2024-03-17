import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import ActionButtons from '../ActionButtons/ActionButtons';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {
  ListItem,
  ListHeader,
  ListContent,
  Image,
  List,
} from 'semantic-ui-react';
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
    <List divided verticalAlign="middle">
      {item.map(entry => {
      return(
        <ListItem key={entry.id}>
          <li key={entry.id}> <Image avatar src={"/home-placeholder.jpeg"} onClick={() => history.push(`/item-details/${entry.id}`)}/>
          <ListContent>
            <ListHeader>{entry.name} priority level: {entry.priority_level}</ListHeader>
            </ListContent> 
          </li>
        </ListItem>
      );
      })}
    </List>
    </>)
  };
  // {item.map(entry => {
  //   return(
  //     <div key={entry.id}>
  //       <li key={entry.id}> <img width={50} height={50} src={"/home-placeholder.jpeg"} onClick={() => history.push(`/item-details/${entry.id}`)}/>{entry.name} priority level: {entry.priority_level}
  //       </li>
  //     </div>
  
  return (
    <>
    <div className="dashboard">
      <SideNav />
      <div className="home-container">
      <AppHeader />
      <div className="home-content">
        <h2>Welcome, {user.f_name}!</h2>
        <div className="home-btns">
        <ActionButtons name="Add Home Item" onClick={() => history.push('/add-item')}/>
        <ActionButtons name="Manage Items" onClick={() => setToggleManageBtn(!toggleManageBtn)}/>
        </div>
        
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
      
      </div>
      </div>
    </div>
    </>
  );
}


export default HomeDashboard;
