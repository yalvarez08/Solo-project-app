import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import ActionButtons from '../ActionButtons/ActionButtons';
import Swal from 'sweetalert2';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {
  Button,
  ListItem,
  ListContent,
  Icon,
  Image,
  List,
  Popup
} from 'semantic-ui-react';
import './HomeDashboard.css';

function HomeDashboard() {
  const user = useSelector(store => store.user);
  const item = useSelector(store => store.item);
  const updateItem = useSelector(store => store.updateItem);
  const itemDetails = useSelector(store => store.itemDetails);

  const [toggleManageBtn, setToggleManageBtn] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

// on load, fetch and render all user's home items from db
  useEffect(() => {
    dispatch({type: 'FETCH_ITEM'});
  }, []);

// runs when user clicks trash button to delete item  
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
  
// runs when user clicks check button to mark item as complete  
  const markItemComplete = (id) => { 
    console.log('item is:', itemDetails);
    dispatch({type: 'SET_UPDATE', payload: itemDetails});
    //console.log('mark complete updateItem:', updateItem);
    axios.put(`/api/item/complete/${id}`, updateItem)
    .then(res => {
      dispatch({type: 'CLEAR_UPDATE'});
      dispatch({type: 'FETCH_ITEM'});
      Swal.fire({
        confirmButtonColor: "#ADD444",
        title: 'Task item has been marked complete.'
      });
    })
    .catch(err => {
      console.log('Error with updating is_complete info:', err);
    })
  }

  const renderHomeItems = () => {
    return (<>
    <List relaxed="very" divided animated verticalAlign="middle" size="big">
      {item.map(entry => {
      return(
        <ListItem key={entry.id}>
          <ListContent>
              <Image avatar src={"/home-placeholder.jpeg"} onClick={() => history.push(`/item-details/${entry.id}`)}/>
              {entry.is_complete ? <span style={completionStyle}>{entry.name}</span> : entry.name}
          </ListContent>
        </ListItem>
      );
      })}
    </List>
    </>)
  };

// this style is applied to item name when is_complete = true
  const completionStyle = {
    textDecoration: 'line-through',
    color: 'grey',
  }

// this is styling for popup that appears when hovering over check or trashbin buttons
  const style = {
    borderRadius: 3,
    opacity: 0.8,
    padding: '1em',
  }
  
  return (
    <>
    <div className="dashboard">
      <SideNav />
        <div className="home-container">
          <AppHeader />
        <div className="home-title">
          <h2>Welcome, {user.f_name}!</h2>
        </div>
        <div className="home-content">
        <div className="home-btns">
          <ActionButtons name="Add Home Item ✚" onClick={() => history.push('/add-item')}/>
          <ActionButtons name="Manage Items" onClick={() => setToggleManageBtn(!toggleManageBtn)}/>
        </div>
        <div> 
        <h3>Your Maintenance Items:</h3>
        { toggleManageBtn ? renderHomeItems() : <>
          <List relaxed divided verticalAlign="middle" size="big">
          {item.map(entry => {
            return(
              <ListItem key={entry.id}>
                <ListContent>
                <Image avatar src={"/home-placeholder.jpeg"} onClick={() => history.push(`/item-details/${entry.id}`)}/>
                  {entry.name} 
                </ListContent>
                  <ListContent floated="right" className="togglebtns">
                  <Popup content='click to mark item complete' position='left center' style={style} inverted
                  trigger={entry.user_id === user.id && <Button icon onClick={() => markItemComplete(entry.id)}><Icon name="checkmark" /></Button>}
                  />
                  {/* {entry.user_id === user.id && <Button icon onClick={() => markItemComplete(entry.id)}><Icon name="checkmark" /></Button>} */}
                  <Popup content='click to delete item' position='left center' style={style} inverted
                  trigger={entry.user_id === user.id && <Button icon onClick={() => deleteHomeItem(entry.id, entry.user_id)}><Icon name="trash alternate outline" /></Button>}
                  />
                  {/* {entry.user_id === user.id && <Button icon onClick={() => deleteHomeItem(entry.id, entry.user_id)}><Icon name="trash alternate outline" /></Button>} */}
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
