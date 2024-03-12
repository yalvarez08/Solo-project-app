import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

function ItemDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const item = useSelector(store => store.item);
  
  return (
    <div className="container">
      <p>Item Details</p>
    </div>
  );
}

export default ItemDetails;
