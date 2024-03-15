import React, {useEffect} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';


function EditHomeItem() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const updateItem = useSelector(store => store.updateItem);

    const handleChange = (evt, key) => {
        dispatch({
            type: 'UPDATE_ONCHANGE',
            payload: {property: key, value: evt.target.value}
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
            onChange={(evt) => handleChange(evt, 'name')}
          />
          <input
            type="text"
            name="priority_lvl"
            required
            value={updateItem.priority_level}
            onChange={(evt) => handleChange(evt, 'priority_level')}
          />
          <input
            type="text"
            name="location"
            required
            value={updateItem.location}
            onChange={(evt) => handleChange(evt, 'location')}
          />
          <input
            type="text"
            name="re_date"
            required
            value={updateItem.re_date}
            onChange={(evt) => handleChange(evt, 're_date')}
          />
          <button type="submit">Save changes</button>
        </form>
        </>
      );
}

export default EditHomeItem