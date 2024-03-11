import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Datetime from 'react-datetime';


function AddHomeItem() {

    const [itemName, setItemName] = useState('');
    const [replaceDate, setReplaceDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [priorityLvl, setPriorityLvl] = useState('');

    const dispatch = useDispatch();

    const submitItem = (event) => {
    event.preventDefault();

        dispatch({
            type: 'ADD_ITEM',
            payload: {
                name: itemName,
                re_date: replaceDate,
                location: location,
                priority_level: priorityLvl
            },
            });
    };

    return (
        <form className="addItemForm" onSubmit={submitItem}>
                <div>
                    <label htmlFor="name">Item name:</label>
                    <input value={itemName} required onChange={evt => setItemName(evt.target.value)} />
                </div>
                <div>
                    <label htmlFor="re_date">Date of repair/replacement:</label>
                    <Datetime value={replaceDate} onChange={date => setReplaceDate(date)} />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input value={location} required onChange={evt => setLocation(evt.target.value)} />
                </div>
                <div>
                    <label htmlFor="priority">Priority Level:</label>
                    <input value={priorityLvl} required onChange={evt => setPriorityLvl(evt.target.value)} />
                </div>

                <button>Add Item Event</button>
            </form>

    )
}

export default AddHomeItem