import React, { useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import SideNav from '../SideNav/SideNav';
import ActionButtons from '../ActionButtons/ActionButtons';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Datetime from 'react-datetime';
import {
    FormSelect,
    FormField,
    Checkbox,
    Button,
    ModalHeader,
    ModalDescription,
    ModalContent,
    ModalActions,
    Header,
    Modal,
} from 'semantic-ui-react';
import './AddHomeItem.css';


function AddHomeItem() {

    const [itemName, setItemName] = useState('');
    const [replaceDate, setReplaceDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [priorityLvl, setPriorityLvl] = useState('');
    const [open, setOpen] = useState(false);
    const [reminder, setReminder] = useState('yes');

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

    const reminderModal = () => {
  
        return (
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={<Button>Reminder?</Button>}
            >
            <ModalHeader>Set Reminder</ModalHeader>
                <ModalContent>
                    <ModalDescription>
                    <p>Would you like to set a recurring reminder for this maintenance item?</p>
                    </ModalDescription>  
                </ModalContent>  
            <ModalActions>
                <Button color='black' onClick={() => setOpen(false)}>
                No thanks.
                </Button>
                <Button
                    content="Yes!"
                    color='olive'
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                />
            </ModalActions>    
            </Modal>
        )
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
                            <Datetime value={replaceDate} onChange={date => setReplaceDate(date)} />
                        </div>
                        <div>
                        <ActionButtons name="Save & Add Item" />
                        </div>
                    </form>
                    <div>
                    <ActionButtons name="Set Reminder?" />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddHomeItem


{/* <FormField>
                    Would you like to set a recurring reminder?: <b>{reminder}</b>
                    </FormField>
                        <FormField>
                            <Checkbox
                            radio
                            label='Yes!'
                            name='checkboxRadioGroup'
                            value='Yes!'
                            checked={reminder === 'yes'}
                            onChange={(evt, data) => setReminder(data.value)}
                            />
                        </FormField>
                        <FormField>
                            <Checkbox
                            radio
                            label='No thanks.'
                            name='checkboxRadioGroup'
                            value='No thanks.'
                            checked={reminder === 'no'}
                            onChange={(evt, data) => setReminder(data.value)}
                            />
                        </FormField> */}