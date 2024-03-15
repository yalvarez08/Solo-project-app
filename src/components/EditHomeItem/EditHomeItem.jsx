import React, {useState} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Datetime from 'react-datetime';


function EditHomeItem() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [replaceDate, setReplaceDate] = useState(new Date());
    const updateItem = useSelector(store => store.updateItem);

    // useEffect(() => {
    //     dispatch({type: 'FETCH_ITEM_DETAILS', payload: id});
    //   }, []);

    const handleChange = (evt) => {
        dispatch({
            type: 'UPDATE_ONCHANGE',
            payload: {property: evt.target.name, value: evt.target.value}
        });
    }

    const handleSaveChanges = (evt) => {
        evt.preventDefault();
        axios.put(`/api/item/${updateItem.id}`, updateItem)
        .then(res => {
            dispatch({type: 'CLEAR_UPDATE'})
            history.push('/user'); //redirect back to user dashboard
        })
        .catch(err => {
            console.log('Error with updating home item info:', err);
        })
    }

    return (
        <>
        <div className="container">
          <h2>Edit Item</h2>
          <button onClick={() => history.push('/user')}>Back to dashboard</button>
        </div>
        <form className="update-form" onSubmit={handleSaveChanges}>
          <input
            type="text"
            name="item_name"
            required
            value={updateItem.name}
            placeholder="item name"
            onChange={(evt) => handleChange(evt)}
          />
          <input
            type="number"
            name="priority_lvl"
            required
            value={updateItem.priority_level}
            placeholder="priority level"
            onChange={(evt) => handleChange(evt)}
          />
          <input
            type="text"
            name="location"
            required
            value={updateItem.location}
            placeholder="location"
            onChange={(evt) => handleChange(evt)}
          />
          <Datetime
            type="date"
            name="re_date"
            required
            value={replaceDate}
            onChange={(date) => setReplaceDate(date)}
          />
          <button type="submit">Save changes</button>
        </form>
        </>
      );
}

export default EditHomeItem