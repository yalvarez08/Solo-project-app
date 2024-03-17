import React, { useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Datetime from 'react-datetime';
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
        history.push('/dashboard');
    };

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
                            <input type="number" value={priorityLvl} required onChange={evt => setPriorityLvl(evt.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="re_date">Date of repair/replacement:</label>
                            <Datetime value={replaceDate} onChange={date => setReplaceDate(date)} />
                        </div>
                        <div>
                        <button type="submit">Save & Add Item</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddHomeItem