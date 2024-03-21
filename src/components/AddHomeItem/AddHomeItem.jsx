import React, { useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import ActionButtons from '../ActionButtons/ActionButtons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Datetime from 'react-datetime';
import Swal from 'sweetalert2';
import './AddHomeItem.css';


function AddHomeItem() {

    const [itemName, setItemName] = useState('');
    const [replaceDate, setReplaceDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [priorityLvl, setPriorityLvl] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const submitItem = (evt) => {
        evt.preventDefault();
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                name: itemName,
                re_date: replaceDate,
                location: location,
                priority_level: priorityLvl,
            },
        });
        Swal.fire({
            confirmButtonColor: "#ADD444",
            title: "Success. Your maintanence item has been added!"
        });
        history.push('/dashboard');
    };

    const handleCancel = () => {
        console.log('cancel button clicked.');
        Swal.fire({
          title: "Cancel new item entry?",
          text: "Information entered on this page will not be saved.",
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
            <div className="add-view">
                <SideNav />
                <div className="add-container">
                    <AppHeader />
                    <div className="add-content">
                        <h2>Add Item</h2>
                    </div>
                    <div className="form-content">
                        <h4>Enter information about your task below and it will be added to your list of maintenance items.</h4>
                        <form onSubmit={submitItem}>
                            <div className="form-wrapper">
                            <div className="form-input">
                                <label htmlFor="name">Item name:</label>
                                <input value={itemName} required onChange={evt => setItemName(evt.target.value)} />
                            </div>
                            <div className="form-input">
                                <label htmlFor="location">Location:</label>
                                <select value={location} required onChange={evt => setLocation(evt.target.value)}>
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
                            <div className="form-input">
                                <label htmlFor="priority">Priority Level:</label>
                                <select value={priorityLvl} required onChange={evt => setPriorityLvl(evt.target.value)}>
                                <option value=''>Select</option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                </select>
                            </div>
                            <div className="form-input">
                                <label htmlFor="re_date">Date of repair/replacement:</label>
                                <Datetime value={replaceDate} onChange={date => setReplaceDate(date)} />
                            </div>
                            </div>
                            <div className="saveAdd-btn">
                                <ActionButtons name="Save & Add Item" /> 
                                <span className="cancel" onClick={handleCancel}>Cancel</span>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddHomeItem

