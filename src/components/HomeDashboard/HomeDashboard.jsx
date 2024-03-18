import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import ActionButtons from '../ActionButtons/ActionButtons';
import AddRemModal from '../AddRemModal/AddRemModal';
import Swal from 'sweetalert2';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {
  Button,
  ListItem,
  ListHeader,
  ListContent,
  Icon,
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
    Swal.fire({
      title: "Are you sure?",
      text: "Your maintenance item will be permanently deleted from your list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ADD444",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!"
    })
    .then(result => {
      if(result.isConfirmed) {
        dispatch({type: 'DELETE_ITEM', payload: {id, user_id}});
        Swal.fire({
          title: "Deleted!",
          text: `Maintenance item has been deleted.`,
          icon: "success"
        });
      } else if(result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Your maintenance item is safe!",
          icon: "error"
        });
      }})
  }
  
  const markItemComplete = (id, user_id) => { //👈bug here: still needs work ❗️
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

  // <Button icon onClick={() => AddReminder(entry.id, entry.user_id)}><Icon name="bell" /></Button>
  const renderHomeItems = () => {
    return (<>
    <List relaxed divided verticalAlign="middle" size="big">
      {item.map(entry => {
      return(
        <ListItem key={entry.id}>
          <ListContent>
              <Image avatar src={"/home-placeholder.jpeg"} onClick={() => history.push(`/item-details/${entry.id}`)}/>
              {entry.name} priority level: {entry.priority_level}
          </ListContent>
        </ListItem>
      );
      })}
    </List>
    </>)
  };
  
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
          <List relaxed divided verticalAlign="middle" size="big">
          {item.map(entry => {
            return(
              <ListItem key={entry.id}>
                <ListContent>
                <Image avatar src={"/home-placeholder.jpeg"} onClick={() => history.push(`/item-details/${entry.id}`)}/>
                  {entry.name} priority level: {entry.priority_level}
                </ListContent>
                  <ListContent floated="right">
                  {entry.user_id === user.id && <Button icon onClick={() => markItemComplete(entry.id, entry.user_id)}><Icon name="checkmark" /></Button>}
                  {entry.user_id === user.id && <Button icon onClick={() => deleteHomeItem(entry.id, entry.user_id)}><Icon name="trash alternate outline" /></Button>}
                  {entry.user_id === user.id && <AddRemModal trigger={<Button>Content</Button>} />}
                  </ListContent>
              </ListItem>
            );
          })}
          </List>
        </>} 
        </div>
      
        </div>
      </div>
    </div>
    </>
  );
}


export default HomeDashboard;


// <li key={entry.id}> <Image avatar src={"/home-placeholder.jpeg"} onClick={() => history.push(`/item-details/${entry.id}`)}/>
  //    <ListContent>
  //       <ListHeader>{entry.name} priority level: {entry.priority_level}</ListHeader>
  //    </ListContent> 
  // </li>