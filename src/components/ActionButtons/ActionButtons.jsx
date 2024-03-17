import React from 'react';
import './ActionButtons.css';


function ActionButtons({name, onClick}) {

    return(
        <div>
            <div>
                <button className='action-btns' onClick={onClick}>{name}</button>
            </div>
        </div>
    )
}

export default ActionButtons