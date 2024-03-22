import React, {useEffect} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import ActionButtons from '../ActionButtons/ActionButtons';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import './ItemDetails.css';

function ItemDetails() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const history = useHistory();
  const itemDetails = useSelector(store => store.itemDetails);
  const remDetails = useSelector(store => store.remDetails);


  useEffect(() => {
    dispatch({type: 'FETCH_ITEM_DETAILS', payload: id});
  }, []);
// console.log('rendering item details:', itemDetails);
  

  if(itemDetails.priority_level === 3) {
    itemDetails.priority_level = "high"
  } else if(itemDetails.priority_level === 2) {
    itemDetails.priority_level = "medium"
  } else if (itemDetails.priority_level === 1) {
    itemDetails.priority_level = "low"
  }
  
  const checkColor = () => {
    switch (itemDetails.priority_level) {
      case "high":
        return "red";
      case "medium":
        return "#FCCE45";
      case "low":
        return "green";
      default:
    }
  }

  const handleEditClick = () => {
    dispatch({type: 'SET_UPDATE', payload: itemDetails});
    history.push(`/edit-item/${id}`)
  }

  const handleReminderClick = () => {
    dispatch({type: 'SET_REM_DETAILS', payload: itemDetails});
    history.push(`/add-reminder`)
  }


  return (
    <>
    <div className="details-view">
      <SideNav />
        <div className="details-container">
          <AppHeader />
          <div className="details">
            <h2>Item Details</h2>
          </div>
          <div className="details-content">
            <Icon size="large" name="angle left" onClick={() => history.push('/dashboard')} /> <span>Back to dashboard</span>
            <div className="edit">
              <ActionButtons className="edit-btn" name="Edit Item 🖊️" onClick={handleEditClick} />
            </div>
            <div className="edit">             
              <ActionButtons className="reminder-btn" name="Set Reminder?" onClick={handleReminderClick} />
            </div>
            <div className="info">
              <h2>{itemDetails.name}</h2> <p>Priority level: <span style={{color: `${checkColor()}`}}>{itemDetails.priority_level}</span></p>
                <img width={50} height={50} src={"/home-placeholder.jpeg"} />
                <p>Location: {itemDetails.location}</p>
                <p>Last Date: {itemDetails.re_date}</p>
            </div>
          </div>
        </div>
    </div>
    </>
  );
}

export default ItemDetails;
