import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

function ItemDetails() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const history = useHistory();
  const item = useSelector(store => store.item);

  useEffect(() => {
    dispatch({type: 'FETCH_ITEM_DETAILS', payload: id});
  }, []);

  // const renderDetails = () => {
   
  // }
  return (
    <div className="container">
      <p>Item Details</p>
    </div>
  );
}

export default ItemDetails;
