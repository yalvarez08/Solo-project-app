import React, { useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import ActionButtons from '../ActionButtons/ActionButtons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AddReminder.css';

function AddReminder() {

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

    return (
        <>
            <div className="add-rem-view">
                <SideNav />
                <div className="add-rem-container">
                    <AppHeader />
                    <div className="add-rem-content">
                        <h2>Add Reminder</h2>
                    </div>
                    <div className="add-rem-form">
                        <h4>Enter reminder details for your existing maintenance item.</h4>
                        <form onSubmit={submitItem}>
                            <div className="form-input">
                                <label htmlFor="name">Item name:</label>
                                <input value={itemName} required onChange={evt => setItemName(evt.target.value)} />
                            </div>
                            <div className="form-input">
                                <label htmlFor="location">Location:</label>
                                <input value={location} required onChange={evt => setLocation(evt.target.value)} />
                            </div>
                            <div className="form-input">
                                <label htmlFor="priority">Priority Level:</label>
                                <input type="number" max='3' value={priorityLvl} required onChange={evt => setPriorityLvl(evt.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="re_date">Date of repair/replacement:</label>
                                
                            </div>
                            <div>
                                <ActionButtons name="Save & Add Item" />
                            </div>
                        </form>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddReminder