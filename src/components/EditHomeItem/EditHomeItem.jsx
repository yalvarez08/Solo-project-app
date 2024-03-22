import React, {useState} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import ActionButtons from '../ActionButtons/ActionButtons';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Datetime from 'react-datetime';
import Swal from 'sweetalert2';
import { Icon } from 'semantic-ui-react';
import './EditHomeItem.css';


function EditHomeItem() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [replaceDate, setReplaceDate] = useState(new Date());
    const updateItem = useSelector(store => store.updateItem);


    const handleChange = (evt, key) => {
        dispatch({
            type: 'UPDATE_ONCHANGE',
            payload: {property: key, value: evt.target.value}
        });
    }

    //onSubmit, this function will handle the evt
    const handleSaveChanges = (evt) => {
        evt.preventDefault();
        console.log(updateItem);
        axios.put(`/api/item/${updateItem.id}`, updateItem) 
        .then(res => {
            dispatch({type: 'CLEAR_UPDATE'})
            Swal.fire({
              confirmButtonColor: "#ADD444",
              title: "Success. Changes have been saved!"
            });
            history.push('/dashboard'); //redirect back to user dashboard
        })
        .catch(err => {
            console.log('Error with updating home item info:', err);
        })
    }

    //called for onClick evt listener for cancel button
    const handleCancel = () => {
      console.log('cancel button clicked.');
      Swal.fire({
        title: "Cancel edit?",
        text: "Any changes made to this maintenance item will not be saved.",
        showCancelButton: true,
        confirmButtonColor: "#ADD444",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel",
        cancelButtonText: "No!"
      })
      .then(result => {
        if(result.isConfirmed) {
          history.push('/dashboard');
        } 
        })
    }
  

    return (
      <>
      <div className="edit-view">
        <SideNav />
          <div className="edit-container">
            <AppHeader />
          <div className="edit-title">
            <h2>Edit Item</h2>
          </div>
          <div className="edit-content">
            <Icon size="large" name="angle left" onClick={() => history.push('/dashboard')} /> <span>Back to dashboard</span>
 
            <form onSubmit={handleSaveChanges}>
            <div className="form-wrapper">
              <div className="edit-input">
                <label htmlFor="name">Name:</label>
                <input
                type="text"
                required
                value={updateItem.name}
                placeholder="item name"
                onChange={(evt) => handleChange(evt, 'name')}
                />
              </div>
              <div className="edit-input">
              <label htmlFor="priority">Priority Level:</label>
                <select value={updateItem.priority_level} required onChange={(evt) => handleChange(evt, 'priority_level')}>
                  <option value=''>Select</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                </select>
              </div>
              <div className="edit-input">
              <label htmlFor="location">Location:</label>
              <select value={updateItem.location} required onChange={(evt) => handleChange(evt, 'location')}>
                <option value=''>Select location</option>
                  <option value='attic'>attic</option>
                  <option value='bathroom'>bathroom</option>
                  <option value='basement'>basement</option>
                  <option value='bedroom'>bedroom</option>
                  <option value='dining room'>dining room</option>
                  <option value='exterior'>exterior</option>
                  <option value='foyer'>foyer</option>
                  <option value='garage'>garage</option>
                  <option value='hallway'>hallway</option>
                  <option value='kitchen'>kitchen</option>
                  <option value='outdoors'>outdoors</option>
              </select>
              </div>
              <div className="edit-input">
              <Datetime
                type="date"
                name="re_date"
                required
                value={replaceDate}
                onChange={date => setReplaceDate(date)}
              />
              </div>
            </div>
              <div className="saveEdit-btn">
                    <ActionButtons name="Save Changes" /> 
                    <span className="cancel" onClick={handleCancel}>Cancel</span>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>);
}

export default EditHomeItem