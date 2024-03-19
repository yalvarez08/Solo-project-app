import React, { useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import ActionButtons from '../ActionButtons/ActionButtons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Datetime from 'react-datetime';
import './AddReminder.css';

function AddReminder() {

    const [frequency, setFrequency] = useState('');
    const [nextDate, setNextDate] = useState(new Date());
    const [notes, setNotes] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const submitReminder = (evt) => {
        evt.preventDefault();
        dispatch({
            type: 'ADD_REMINDER',
            payload: {
                frequency: frequency,
                next_date: nextDate,
                description_notes: notes,
            },
        });
        Swal.fire({
            confirmButtonColor: "#ADD444",
            title: "Success. A reminder for this maintenance item has been added!"
        });
        history.push('/reminders');
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
                        <form onSubmit={submitReminder}>
                            <div className="form-input">
                                <label htmlFor="frequency">Frequency:</label>
                                <input value={frequency} required onChange={evt => setFrequency(evt.target.value)} />
                            </div>
                            <div className="form-input">
                                <label htmlFor="nextDate">Next Date:</label>
                                <Datetime value={nextDate} onChange={date => setNextDate(date)} />
                            </div>
                            <div className="form-input">
                                <label htmlFor="notes">Description Notes:</label>
                                <input value={notes} required onChange={evt => setNotes(evt.target.value)} />
                                <textarea rows="5" cols="33" placeholder='Enter comment...' maxLength='1000'>
                                    This is the default comment...  
                                </textarea>
                            </div>
                            <div>
                                <ActionButtons name="Save To Reminders" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddReminder