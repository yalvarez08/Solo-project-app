import React from 'react';
import './ActionButtons.css';


function ActionButtons({name, onClick}) {

    return(
        <div className='action-btns'>
            <div>
                <button className='left' onClick={onClick}>{name}</button>
            </div>
        </div>
    )
}

export default ActionButtons