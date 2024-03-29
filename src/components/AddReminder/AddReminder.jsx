import React, { useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import ActionButtons from '../ActionButtons/ActionButtons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Datetime from 'react-datetime';
import Swal from 'sweetalert2';
import './AddReminder.css';

function AddReminder() {

    const [frequency, setFrequency] = useState('');
    const [nextDate, setNextDate] = useState(new Date());
    const [notes, setNotes] = useState('');
    const {id} = useParams();
    const remDetails = useSelector(store => store.remDetails);

    const dispatch = useDispatch();
    const history = useHistory();
   
      
    const checkColor = () => {
        switch (remDetails.priority_level) {
        case "high":
            return "red";
        case "medium":
            return "#FCCE45";
        case "low":
            return "green";
        default:
        }
    }
   
    const submitReminder = (evt) => {
        evt.preventDefault();
        dispatch({
            type: 'ADD_REMINDER',
            payload: {
                frequency: frequency,
                next_date: nextDate,
                description_notes: notes,
                home_item_id: remDetails.id,
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
                        <h3 className="rem-name">{remDetails.name} </h3> <h3>Priority level: <span style={{color: `${checkColor()}`}}>{remDetails.priority_level}</span></h3>
                        <form onSubmit={submitReminder}>
                            <div className="rem-wrapper">
                                <div className="form-input">
                                    <label htmlFor="frequency">Frequency:</label>
                                    <select value={frequency} required onChange={evt => setFrequency(evt.target.value)}>
                                        <option value=''>Select frequency</option>
                                        <option value='weekly'>Weekly</option>
                                        <option value='bi-weekly'>Bi-Weekly</option>
                                        <option value='monthly'>Monthly</option>
                                        <option value='annually'>Annually</option>
                                    </select>
                                </div>
                                <div className="form-input">
                                    <label htmlFor="nextDate">Next Date:</label>
                                    <Datetime value={nextDate} onChange={date => setNextDate(date)} />
                                </div>
                                <div className="form-input">
                                    <label htmlFor="notes">Description Notes:</label>
                                    <textarea rows="5" cols="33" value={notes} onChange={evt => setNotes(evt.target.value)} maxLength='200'></textarea>
                                </div>
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