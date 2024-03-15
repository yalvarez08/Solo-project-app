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

  const handleEditClick = () => {
    dispatch({type: 'SET_UPDATE', payload: itemDetails});
    history.push(`/edit-item/${id}`)
  }

  const renderDetails = () => {
   if(itemDetails.length > 0) {
    return (
      <>
      <h2>{itemDetails[0].name}</h2>
      <img width={50} height={50} src={"/home-placeholder.jpeg"} />
      <p>Priority level: {itemDetails[0].priority_level}</p>
      <p>{itemDetails[0].location}</p>
      <p>{itemDetails[0].re_date}</p>
      </>
    )
  } else {
    return <h3>No details at this time. Try again later.</h3>
  }}

  return (
    <>
    <div className="container">
      <h2>Item Details</h2>
      <button onClick={() => history.push('/user')}>Back to dashboard</button>
    </div>
    <div>
      {renderDetails()}
    </div>
    <button onClick={handleEditClick}>Edit Item</button>
    </>
  );
}

export default ItemDetails;
