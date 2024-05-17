import React, { useState, useEffect } from 'react';
import '../../Card/card.css';

const AdminCard = ({title})=> {
    return (
        <div className="card">
            <div className="card-content">
                <h6>{title}</h6>
                <div className='cardTop'>
                <p className='counter-total'>0</p>
                </div>
            </div>
        </div>
    )
}

export default AdminCard
