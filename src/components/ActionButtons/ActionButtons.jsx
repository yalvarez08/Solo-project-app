import React from 'react';
import './ActionButtons.css';


function ActionButtons({name, onClick, onSubmit}) {

    return(
        <div>
            <div>
                <button className='action-btns' onClick={onClick} onSubmit={onSubmit}>{name}</button>
            </div>
        </div>
    )
}

export default ActionButtons