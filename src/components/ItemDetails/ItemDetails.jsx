import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';

function ItemDetails() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const history = useHistory();
  const itemDetails = useSelector(store => store.itemDetails);


  useEffect(() => {
    dispatch({type: 'FETCH_ITEM_DETAILS', payload: id});
  }, []);
// console.log('rendering item details:', itemDetails);
  
  const handleEditClick = () => {
    dispatch({type: 'SET_UPDATE', payload: itemDetails});
    history.push(`/edit-item/${id}`)
  }


  return (
    <>
    <div className="container">
      <h2>Item Details</h2>
      <button onClick={() => history.push('/dashboard')}>Back to dashboard</button>
    </div>
    <div>
      <h2>{itemDetails.name}</h2>
      <img width={50} height={50} src={"/home-placeholder.jpeg"} />
      <p>Priority level: {itemDetails.priority_level}</p>
      <p>{itemDetails.location}</p>
      <p>{itemDetails.re_date}</p>
    </div>
    <button onClick={handleEditClick}>Edit Item</button>
    </>
  );
}

export default ItemDetails;
